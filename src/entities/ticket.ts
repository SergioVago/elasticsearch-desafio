import { differenceInMinutes } from 'date-fns'
import { v4 as uuid } from 'uuid'

type CabinClass = 'economica' | 'premium'

export interface TicketProps {
  id: string // Id do voo.
  company: string // Nome da compania aérea.

  departureTime: string // Data de partida.
  departureStation: string // Local de partida (ex: VIX).

  arrivalTime: string // Data de chegada.
  arrivalStation: string // Local de chegada (ex: REC).
  stopsPlaces: string[] // Locais de paradas (ex: [CNF, CHZ]).

  remainingSeats: number // Assentos restantes. (obs: bebês não ocupam assentos)

  cabinClass?: CabinClass // Tipo de cabine. Pode ser economica ou premium.
}

export class Ticket {
  private props: TicketProps

  constructor(props: Omit<TicketProps, 'id'>, id?: string) {
    if (id) {
      this.props = {
        ...props,
        id,
      }
    } else {
      this.props = {
        ...props,
        id: uuid(),
      }
    }
  }

  public calculateLegDurationInMinutes() {
    return differenceInMinutes(
      new Date(this.props.arrivalTime),
      new Date(this.props.departureTime),
    )
  }

  public getParsedTicket() {
    const legDurationTimeInMinutes = this.calculateLegDurationInMinutes()

    return {
      arrivalStation: this.props.arrivalStation,
      arrivalTime: this.props.arrivalTime,
      company: this.props.company,
      departureStation: this.props.departureStation,
      departureTime: this.props.departureTime,
      legDurationTimeInMinutes,
      stopsPlaces: this.props.stopsPlaces,
      id: this.props.id,
    }
  }

  public get all(): TicketProps {
    return this.props
  }

  public get id(): string {
    return this.props.id
  }

  public set id(newId: string) {
    this.props.id = newId
  }

  public get departureStation(): string {
    return this.props.departureStation
  }

  public get arrivalStation(): string {
    return this.props.arrivalStation
  }

  public get remainingSeats(): number {
    return this.props.remainingSeats
  }

  public get departureTime(): string {
    return this.props.departureTime
  }

  public get arrivalTime(): string {
    return this.props.arrivalTime
  }

  public get company(): string {
    return this.props.company
  }

  public get stopsPlaces(): string[] {
    return this.props.stopsPlaces
  }
}
