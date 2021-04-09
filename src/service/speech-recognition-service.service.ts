import { Injectable, NgZone  } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from "lodash";

import { CommonService } from 'src/service/common.service';

// export interface IWindow extends Window {
//     webkitSpeechRecognition: any;
//     SpeechRecognition: any;
// }

declare global {

export interface IWindow extends Window  {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;

}



}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionServiceService {

  speechRecognition: any;

  constructor(private zone: NgZone, public common: CommonService) {
  }













  
  record(getLangid): Observable<string> {

    return Observable.create(observer => {
        // const { webkitSpeechRecognition }  = window.webkitSpeechRecognition;
        // const {webkitSpeechRecognition} = (window as any);
        const { webkitSpeechRecognition }: IWindow = (window as any);
        this.speechRecognition =  new webkitSpeechRecognition();
        // this.speechRecognition = SpeechRecognition;
        this.speechRecognition.continuous = true;
        //this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = getLangid;
        this.speechRecognition.maxAlternatives = 6;

        this.speechRecognition.onresult = speech => {
            let term: string = "";
            if (speech.results) {
                var result = speech.results[speech.resultIndex];
                var transcript = result[0].transcript;
                if (result.isFinal) {
                    if (result[0].confidence < 0.3) {
                        console.log("Unrecognized result - Please try again");
                    }
                    else {
                        term = _.trim(transcript);
                        console.log("Did you said? -> " + term + " , If not then say something else...");
                    }
                }
            }
            this.zone.run(() => {
                observer.next(term);
            });
        };

        this.speechRecognition.onerror = error => {
            observer.error(error);
        };

        this.speechRecognition.onend = () => {
            observer.complete();
        };

        this.speechRecognition.start();
        this.common.showSuccessMessage("Say something - We are listening !!!")
        console.log("Say something - We are listening !!!");
    });
}

DestroySpeechObject() {
    if (this.speechRecognition)
        this.speechRecognition.stop();
}










}
