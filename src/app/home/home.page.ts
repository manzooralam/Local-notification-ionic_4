import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scheduled = [];

   Max:number=100
   Min:number=1
  constructor(private plt: Platform, private localNotifications: LocalNotifications,
    private alertCtrl: AlertController) {

    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        // this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        // this.showAlert(res.title, res.text, msg);
      });
    });
  }


  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'manzoor@thinktac.com'+Math.floor(Math.random() * this.Max) + this.Min,
      text: 'We have sent the June attendance ' +Math.floor(Math.random() * this.Max) + this.Min,
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true // Show the notification while app is open
    });

    
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: Math.floor(Math.random() * this.Max) + this.Min ,
      title: 'Attendance App !',
      text: 'Please check-in today !!!  ' +Math.floor(Math.random() * this.Max) + this.Min ,
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    });
  }


  repeatingDaily() {
    // this.localNotifications.schedule({
    //   id: 42,
    //   title: 'Good Morning',
    //   text: 'Code something epic today!',
    //   trigger: { every: { hour: 09, minute: 30 } }
    // });
  }

  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  getAll() {
    this.localNotifications.getAll().then((res: ILocalNotification[]) => {
      this.scheduled = res;
    })
  }

}
