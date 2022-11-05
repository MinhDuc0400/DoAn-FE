import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { environment } from '../../../environments/environment';
import { interval, Observable, Observer, Subject } from 'rxjs';
import { distinctUntilChanged, share, takeWhile } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocketSubject<any>;
  private connectionObserver: Observer<boolean>;
  private connectionStatus: Observable<boolean>;

  private reconnectionObservable: Observable<number>;

  private wsEndpoint: string;

  public onSocket = new Subject<any>();

  private readonly socketURL = environment.socketURL;
  private readonly reconnectInterval: number = 5000;
  private readonly reconnectAttempts: number = 10;

  constructor() {
    this.connectionStatus = new Observable<boolean>((observer) => {
      this.connectionObserver = observer;
    }).pipe(share(), distinctUntilChanged());

    this.connectionStatus.subscribe((isConnected) => {
      if (!this.reconnectionObservable && typeof isConnected === 'boolean' && !isConnected) {
        this.reconnect();
      }
    });
  }


  connect(): void {
    console.log('connect')
    if (!this.wsEndpoint) {
      this.connectionObserver.next(false);
      this.wsEndpoint =
        this.socketURL + `?token=${localStorage.getItem('idToken')}`;
      console.log(this.wsEndpoint)
    }
    if ((!this.socket || this.socket.closed) && this.wsEndpoint && this.wsEndpoint !== '') {
      console.log('create new socket')
      this.socket = webSocket({
        url: this.wsEndpoint,
        closeObserver: {
          next: (e: CloseEvent) => {
            console.log('eclose', e);
            this.socket = null;
            this.connectionObserver.next(false);
          },
        },
        openObserver: {
          next: (e: Event) => {
            console.log('open', e);
            this.connectionObserver.next(true);
          },
        },
      });

      console.log(this.socket)
      this.socket.subscribe(
        (data) => {
          console.log(data)
          this.onSocket.next(data);
        },
        (error: Event) => {
          console.log(error)
          if (!this.socket) {
            this.reconnect();
          }
        },
      );
    }
  }

  send(data: any): void {
    this.socket.next(data);
  }

  reconnect(): void {
    this.reconnectionObservable = interval(this.reconnectInterval).pipe(
      takeWhile((index) => {
        return index < this.reconnectAttempts && !this.socket;
      }),
    );
    this.reconnectionObservable.subscribe(
      () => {
        this.connect();
      },
      null,
      () => {
        this.reconnectionObservable = null;
        if (!this.socket) {
          this.onSocket.complete();
          this.connectionObserver.complete();
        }
      },
    );
  }

}
