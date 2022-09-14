import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  form!: FormGroup;
  getDate: any;
  starttime: any;
  endtime: any;
  description: any;
  jQuery: any;
  submitted = false;
  myItems: any[] = [{ index: 0, getdate: '12-01-2022', starttime: '12:08', endtime: '17:23', minutes: '280', description: 'this is my record' }];
  loadTableItems: any[] = [];

  constructor(private formBuilder: FormBuilder,) { }
  ngOnInit() {
    this.loadTableItems

    this.form = this.formBuilder.group({
      index: [''],
      date:[''],
      starttime: ['', [Validators.required]],
      endtime: ['', [Validators.required]],
      description: ['', [Validators.required]],


    });


  }
  get formData() { return this.form.controls; }


  saveData() {
    //create date format
    var timeStart = new Date("01/01/2007 " + this.starttime).getTime();
    var timeEnd = new Date("01/01/2007 " + this.endtime).getTime();



    var hourDiff = timeEnd - timeStart;
    var resultInMinutes = Math.round(hourDiff / 60000);

    var i = this.myItems[0].index += 1;
    this.myItems.push({ index: i, getdate: this.getDate, starttime: this.starttime, endtime: this.endtime, minutes: resultInMinutes, description: this.description })

    this.loadTableItems.push({ index: i, getdate: this.getDate, starttime: this.starttime, endtime: this.endtime, minutes: resultInMinutes, description: this.description })
  }

  // ----delete the item in table-----//
  DeleteItem(i: number) {
    const index = this.myItems.indexOf(this.loadTableItems[i].index);
    this.myItems.splice(index, 1);
    this.loadTableItems.splice(i, 1);
  }

  loadData() {
    this.loadTableItems = this.myItems.filter(res => {
      return res.getdate.match(this.getDate);
    })
  }

  // When user clicks on update button to submit updated value
  UpdateItem(i: number) {
    console.log("i", this.loadTableItems[i].index)
    this.form.setValue({
      index: this.loadTableItems[i].index,
      date:this.loadTableItems[i].getdate,
      starttime: this.loadTableItems[i].starttime,
      endtime: this.loadTableItems[i].endtime,
      description: this.loadTableItems[i].description,

    });

  }

  //---- download PNG File------//
  SavePNG() {
    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      var anchor = document.createElement('a');
      anchor.setAttribute("href", base64image);
      anchor.setAttribute("download", "data.png")
      anchor.click();
    });
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      const myloadTableItemsuserIndex = this.loadTableItems.findIndex(x => x.index == this.form.value.index);
      const myItemsIndex = this.myItems.findIndex(x => x.index == this.form.value.index);
      if (myloadTableItemsuserIndex != null && myloadTableItemsuserIndex != undefined) {

        var timeStart = new Date("01/01/2007 " + this.form.value.starttime).getTime();
        var timeEnd = new Date("01/01/2007 " + this.form.value.endtime).getTime();

        var hourDiff = timeEnd - timeStart;
        var resultInMinutes = Math.round(hourDiff / 60000);

        var data = {index:this.form.value.index,getdate: this.getDate, starttime: this.form.value.starttime, endtime: this.form.value.endtime, minutes: resultInMinutes, description: this.form.value.description }

        this.loadTableItems[myloadTableItemsuserIndex] = data;
        this.myItems[myItemsIndex] = data;
        console.log("loadTableItems",this.loadTableItems)
        // @ts-ignore: Object is possibly 'null'.
        jQuery("#myModal").modal("hide");
      }


    }

  }

}

