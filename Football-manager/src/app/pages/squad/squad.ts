import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';

interface Player {
  id: number;
  name: string;
  position: string;
  is_starting: boolean;
  rating?: number;
}

@Component({
  selector: 'app-squad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './squad.html',
  styleUrls: ['./squad.css']
})
export class SquadComponent implements OnInit {
  clubId!: number;
  players: Player[] = [];
  selectedPlayer: Player | null = null;

  canEdit: boolean = false;

  gks: Player[] = [];
  fwds!: { lw?: Player; st?: Player; rw?: Player };
  mids!: { left?: Player; center?: Player; right?: Player };
  defs!: { lb?: Player; cb1?: Player; cb2?: Player; rb?: Player };
  subs: Player[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clubId = Number(id);
        this.checkPermissions();
        this.loadSquad();
      }
    });
  }

checkPermissions() {
  const role = localStorage.getItem('userRole');
  const myClubId = Number(localStorage.getItem('userClubId'));

  this.canEdit =
    role === 'superuser' ||
    (role === 'manager' && myClubId === this.clubId);
}

  loadSquad() {
    this.api.getPlayersByClub(this.clubId).subscribe({
      next: (data) => {
        this.players = data as Player[];
        this.distributePlayers();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка загрузки:', err)
    });
  }

  distributePlayers() {
    this.gks = [];
    this.defs = {};
    this.mids = {};
    this.fwds = {};

    const startingXI = this.players.filter(p => p.is_starting);
    this.subs = this.players.filter(p => !p.is_starting);

    this.gks = startingXI.filter(p => p.position === 'GK');

    this.defs = {
      lb: startingXI.find(p => p.position === 'LB'),
      cb1: startingXI.filter(p => p.position === 'CB')[0],
      cb2: startingXI.filter(p => p.position === 'CB')[1],
      rb: startingXI.find(p => p.position === 'RB')
    };

    const leftMid = startingXI.find(p => ['LM','CM_L','CM'].includes(p.position));
    const centerMid = startingXI.find(p => ['CDM','CM'].includes(p.position));

    const rightMid = startingXI
      .filter(p => ['RM','CM_R','CM'].includes(p.position))
      .find(p => p.id !== leftMid?.id && p.id !== centerMid?.id);

    this.mids = { left: leftMid, center: centerMid, right: rightMid };

    this.fwds = {
      lw: startingXI.find(p => p.position === 'LW'),
      st: startingXI.find(p => ['ST','CF'].includes(p.position)),
      rw: startingXI.find(p => p.position === 'RW')
    };

    const assignedIds = [
      ...this.gks.map(p => p?.id),
      this.defs.lb?.id, this.defs.cb1?.id, this.defs.cb2?.id, this.defs.rb?.id,
      this.mids.left?.id, this.mids.center?.id, this.mids.right?.id,
      this.fwds.lw?.id, this.fwds.st?.id, this.fwds.rw?.id
    ].filter(Boolean);

    const missingPlayers = startingXI.filter(p => !assignedIds.includes(p.id));
    if (missingPlayers.length) {
      this.subs = [...this.subs, ...missingPlayers];
    }
  }

  isPositionCompatible(player: Player, targetSlot: string): boolean {
    if (!player || targetSlot === 'sub') return true;

    const rules: Record<string, string[]> = {
      GK: ['GK'],
      LB: ['LB', 'LWB'],
      CB: ['CB'],
      RB: ['RB', 'RWB'],
      CDM: ['CDM', 'CM'],
      CM: ['CM', 'CAM', 'CDM', 'LM', 'RM'],
      LW: ['LW', 'LM', 'LF'],
      ST: ['ST', 'CF'],
      RW: ['RW', 'RM', 'RF']
    };

    return rules[targetSlot]?.includes(player.position) ?? true;
  }

  selectPlayer(player: Player | undefined, slotPosition: string) {
    // 🔴 ЖЁСТКАЯ защита
   if (!this.canEdit) return;

if (!this.selectedPlayer) {
  if (player) this.selectedPlayer = player;
  return;
}

if (!this.canPlacePlayer(slotPosition, this.selectedPlayer, player)) {
  this.selectedPlayer = null;
  return;
}

    if (!this.selectedPlayer) {
      if (player) this.selectedPlayer = player;
      return;
    }

    if (this.selectedPlayer.id === player?.id) {
      this.selectedPlayer = null;
      return;
    }

    if (slotPosition !== 'sub' && !this.isPositionCompatible(this.selectedPlayer, slotPosition)) {
      alert(`Позиция не подходит для ${this.selectedPlayer.name}`);
      this.selectedPlayer = null;
      return;
    }

    this.executeSwap(this.selectedPlayer, player, slotPosition);
    this.selectedPlayer = null;
  }
  

  executeSwap(p1: Player, p2: Player | undefined, targetSlot: string) {
  if (!this.canEdit) return;

  const requests = [];

  if (!p2) {
    // просто выход со скамейки
    requests.push(
      this.api.updatePlayer(p1.id, {
        is_starting: true,
        position: targetSlot
      })
    );
  } else {
    // 🔥 ВАЖНО: сначала УБИРАЕМ второго игрока
    requests.push(
      this.api.updatePlayer(p2.id, {
        is_starting: false
      })
    );

    // потом ставим первого
    requests.push(
      this.api.updatePlayer(p1.id, {
        is_starting: true,
        position: targetSlot
      })
    );
  }

  forkJoin(requests).subscribe({
    next: () => this.loadSquad(),
    error: (err) => console.error('Ошибка при обновлении замен:', err)
  });
}
  canPlacePlayer(targetSlot: string, p1: Player, p2?: Player): boolean {
  const startingXI = this.players.filter(p => p.is_starting);

  // если это замена (обмен) — один вышел, другой зашел → количество не меняется
  const isSwap = !!p2;

  // считаем будущий состав
  let futureStarting = [...startingXI];

  if (!isSwap) {
    // добавляем нового
    futureStarting.push(p1);
  }

  // удаляем старого если есть
  if (p2) {
    futureStarting = futureStarting.filter(p => p.id !== p2.id);
  }

  // ❗ 1. лимит 11 игроков
  if (futureStarting.length > 11) {
    alert('В старте может быть только 11 игроков');
    return false;
  }

  // ❗ 2. лимиты по позициям
  const count = (pos: string) =>
    futureStarting.filter(p => p.position === pos).length;

  const limits: Record<string, number> = {
    GK: 1,
    LB: 1,
    RB: 1,
    CB: 2,
    CDM: 1,
    CM: 2,
    LW: 1,
    ST: 1,
    RW: 1
  };

  // если ставим в конкретный слот — учитываем новую позицию
  const newPos = targetSlot;

  if (limits[newPos]) {
    const currentCount = futureStarting.filter(p => p.position === newPos).length;

    if (currentCount > limits[newPos]) {
      alert(`Слишком много игроков на позиции ${newPos}`);
      return false;
    }
  }

  return true;
}
}