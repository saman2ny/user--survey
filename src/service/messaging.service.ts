import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  token:any;
  constructor(private angularFireMessaging: AngularFireMessaging) {
    // this.angularFireMessaging.onMessage.s
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.token=token;
      },
      (err) => {
        if (!('PushManager' in window)) {  
          console.log('Push messaging isn\'t supported.');  
          return;  
        }
      //
      if (Notification.permission === 'denied') {  
         console.log('The user has blocked notifications.');  
         return;  
      }
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}
