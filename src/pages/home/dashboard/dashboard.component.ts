import { Component, OnInit, OnDestroy, NgZone, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { CommonService } from 'src/service/common.service';
import { ApiService } from '../../../service/api.service';
import { ConstantsService } from '../../../service/constants.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as _ from 'lodash';
am4core.useTheme(am4themes_animated);
import * as moment from 'moment';
import { MessagingService } from 'src/service/messaging.service';
import { CountryService } from 'src/service/country.service';
declare var $: any;


export interface CalendarDate {

  mDate: moment.Moment;

  selected?: boolean;

  today?: boolean;
  count: number;
  promoCount: number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Campaigns-Month wise';
  type = 'ColumnChart';
  data: any = [
    // ["Jan",454,54,54]
  ];
  columnNames = ['Year', 'SMS', 'Email', 'Push Notification'];
  options = {};
  width = 600;
  height = 400;
  user: any;
  role: any;
  scheduleList: any = {};
  userCount: any;
  currentDate = moment();
  upcomingScheduleList: any = {
    SMS: [],
    EMAIL: [],
    PUSH: [],
  };
  nextYearString = moment().add(1, 'year').format('YYYY');
  preYearString = moment().subtract(1, 'year').format('YYYY');
  chartd: am4charts.XYChart;
  userCharId: am4charts.XYChart;
  scheduleMonthList: any;
  schedules: any = [];
  quickLinksList: any = [];
  menuList: any = [];
  activeTab: any = 1;
  currentChannel: any = 1;
  currentChart: string;
  dataFrom: any = "This Week";
  campaignPendingData: any = {};
  userPendingData: any = {};
  serviceChartData: any = {};
  serviceChartId: am4charts.PieChart;
  pages = {
    campaignManagement: false,
    campaignMessage: false,
    manageUser: false,
    rolePrivilege: false,
    manageCustomer: false,

    messageTemplate: false,
    promoMarketing: false,
    managerService: false,
    templateParameter: false
  }
  checker = {
    campaignManagement: false,
    campaignMessage: false,
    manageUser: false,
    rolePrivilege: false,
    manageCustomer: false,

    messageTemplate: false,
    promoMarketing: false,
    managerService: false,
    templateParameter: false
  }
  menuPages: any;
  promoList: any;
  channelList: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, private zone: NgZone,
    public messageService: MessagingService, public countryService: CountryService) {


    this.apiService.post(this.constantsService.saveWebToken, { opWebToken: this.messageService.token }).subscribe((succ: any) => {


      // this.scheduleList = succ.data[0]
    }, err => {

    })

    this.countryService.getApiCountryCode();

  }




  setSchedulWeekChart(data) {
    am4core.ready(function () {

      // this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      // Add data
      // chart.data = [{
      //   "day": "2003",
      //   "SUCCESS": 25,
      //   "FAILURE": 35,
      //   "OPTOUT": 21,
      // }, {
      //   "day": "2004",
      //   "SUCCESS": 26,
      //   "FAILURE": 27,
      //   "OPTOUT": 22,
      // }, {
      //   "day": "2005",
      //   "SUCCESS": 28,
      //   "FAILURE": 29,
      //   "OPTOUT": 24,
      // }];
      chart.data = data;
      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "day";
      // categoryAxis.title.text = "Local country offices";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      // categoryAxis.renderer.cellStartLocation = 0.1;
      // categoryAxis.renderer.cellEndLocation = 0.9;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.title.text = "Expenditure (M)";
      valueAxis.maxPrecision = 0;




      // Create series
      function createSeries(field, name, stacked) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "day";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
        series.stacked = stacked;
        series.columns.template.width = am4core.percent(95);
        // series.axisRanges.range.
        // series.range.ChangeAnimation.value = 300;
        // series.range.endValue = 1100;

        // series.stroke = am4core.color("#ff0000"); // red
        if (name == 'Success')
          series.columns.template.fill = am4core.color("#103141"); // sms fill
        else if (name == 'Failure')
          series.columns.template.fill = am4core.color("#7DACC6"); // sms fill
        else if (name == 'OPT Out')
          series.columns.template.fill = am4core.color("#F0D757"); // sms fill
        else
          series.columns.template.fill = am4core.color("#27AAE1"); // sms fill


      }

      createSeries("SUCCESS", "Success", false);
      createSeries("FAILURE", "Failure", false);
      createSeries("OPTOUT", "OPT Out", false);
      createSeries("PENDING", "Pending", false);

      // Add legend
      chart.legend = new am4charts.Legend();

      // this.chartd = chart;
      // });

    });

  }



  ngOnInit() {
    this.user = this.common.getUser()
    this.role = this.common.getRole();
    console.log(this.user.data.roles);

    this.menuPages = this.user.data.roles[0];

    for (let i = 0; i < this.menuPages.length; i++) {
      if (this.menuPages[i].menuLabel == "Manage Campaign") {
        this.pages.campaignManagement = true;
        if (this.menuPages[i].isChecker) {
          this.checker.campaignManagement = true;
        }
      } else if (this.menuPages[i].menuLabel == "Campaign Message Template") {
        this.pages.campaignMessage = true;
        if (this.menuPages[i].isChecker) {
          this.checker.campaignMessage = true;
        }
      } else if (this.menuPages[i].menuLabel == "Manage User") {
        this.pages.manageUser = true;
        if (this.menuPages[i].isChecker) {
          this.checker.manageUser = true;
        }

      } else if (this.menuPages[i].menuLabel == "Role & Privileges") {
        this.pages.rolePrivilege = true;
        if (this.menuPages[i].isChecker) {
          this.checker.rolePrivilege = true;
        }
      } else if (this.menuPages[i].menuLabel == "Service Message Templates") {
        this.pages.messageTemplate = true;
        if (this.menuPages[i].isChecker) {
          this.checker.messageTemplate = true;
        }
      } else if (this.menuPages[i].menuLabel == "Promotional Marketing") {
        this.pages.promoMarketing = true;
        if (this.menuPages[i].isChecker) {
          this.checker.promoMarketing = true;
        }
      } else if (this.menuPages[i].menuLabel == "Manage Services") {
        this.pages.managerService = true;
        if (this.menuPages[i].isChecker) {
          this.checker.managerService = true;
        }
      } else if (this.menuPages[i].menuLabel == "Template Parameters") {
        this.pages.templateParameter = true;
        if (this.menuPages[i].isChecker) {
          this.checker.templateParameter = true;
        }
      } else if (this.menuPages[i].menuLabel == 'Approve Customer Request') {
        this.pages.manageCustomer = true;
        if (this.menuPages[i].isChecker) {
          this.checker.manageCustomer = true;
        }
      }

    }


    this.apiService.post(this.constantsService.scheduledCount, {}).subscribe((succ: any) => {

      console.log(succ);

      this.scheduleList = succ.data
    }, err => {

    })

    this.apiService.post(this.constantsService.upcomingScheduleList, {}).subscribe((succ: any) => {

      console.log(succ);
      this.upcomingScheduleList = succ.data;
    }, err => {

    })

    this.getWeekChartData(1);
    let data = {
      fromDate: this.currentDate.format("DD/MM/YYYY")
    }
    this.getSchduleMonthCount(data)
    this.getScheduleListByDateClick(this.currentDate.format("DD/MM/YYYY"))
    // this.getQuickLinks();
    this.getPromoCount(data);
    this.getPendingData();
    setTimeout(() => {
      // using web to message short code length
    this.apiService.post(this.constantsService.getChannel, {}).subscribe((succ: any) => {


      this.channelList = succ.data.channel;
      for (let i = 0; i < this.channelList.length; i++) {
        if (this.channelList[i].channelId == 1) {
          this.constantsService.isSmsChannelAvailable = true
        }
      }
      // this.list=[{

      // }]
      console.log(succ)
    }, err => {
      this.common.hideLoading()
    })
    }, 500);
    

  }
  getPromoCount(data) {

  }
  getSchduleMonthCount(data) {
    this.common.showLoading();
    this.apiService.post(this.constantsService.promoMonthCount, data).subscribe((prmo: any) => {
      console.log(prmo);
      this.promoList = prmo.data;

      this.apiService.post(this.constantsService.scheuledMonthCount, data).subscribe((succ: any) => {

        this.common.hideLoading();
        console.log(succ);


        this.scheduleMonthList = succ.data;
        this.generateCalendar();

      }, err => {
        this.common.hideLoading();


      })
    }, err => {
      this.common.hideLoading();


    })
  }
  getWeekChartData(channelId) {
    this.common.showLoading();


    this.apiService.post(this.constantsService.scheduledMessageCountWeekWise, { "channelId": channelId }).subscribe((succ: any) => {
      this.common.hideLoading();
      console.log(succ);

      if (succ.code == 200) {
        const weekStart = moment().startOf('week');

        const days = [];
        for (let i = 0; i <= 6; i++) {
          days.push(
            {
              "day": moment(weekStart).add(i, 'days').format('ddd'),
              "date": moment(weekStart).add(i, 'days').format("DD/MM/YYYY"),
              "SUCCESS": 0,
              "FAILURE": 0,
              "OPTOUT": 0,
              "PENDING": 0,
            }

          );
        }

        console.log(days)

        let countData = succ.data;

        for (let i = 0; i < countData.length; i++) {
          // console.log(moment(countData[i].scheduleDate).format("DD/MM/YYYY"));

          for (let j = 0; j < days.length; j++) {
            if (moment(countData[i].scheduleDate).format("DD/MM/YYYY") == days[j].date) {

              if (countData[i].deliveryStatus == 1)
                days[j].SUCCESS = days[j].SUCCESS + 1;
              else if (countData[i].deliveryStatus == 2)
                days[j].FAILURE = days[j].FAILURE + 1;
              else if (countData[i].deliveryStatus == 6)
                days[j].OPTOUT = days[j].OPTOUT + 1;
              else if (countData[i].deliveryStatus == 3)
                days[j].PENDING = days[j].PENDING + 1;

              break;
            }
          }




        }

        this.setSchedulWeekChart(days);



      }

      // this.upcomingScheduleList=succ.data;
    }, err => {
      this.common.hideLoading();


    })
  }
  goTo(data) {



    let roles = this.user.data.roles[0];

    let mainPages = this.common.getMainPages();
    for (let i = 0; i < mainPages.length; i++) {

      var subPage = mainPages[i].page;
      for (var j = 0; j < subPage.length; j++) {
        if (data == 'user' && subPage[j].isView) {
          // this.router.navigateByUrl(roles[i].menuUrl);
          this.router.navigate([subPage[j].menuUrl]);
          this.common.setRole(subPage[j]);
          this.common.setMainMenu(mainPages[i]);
          return;

        } else if (data == 'add user' && subPage[j].isAdd) {
          this.router.navigate(['/home/operator-management/operator']);
          this.common.setRole(subPage[j]);
          this.common.setMainMenu(mainPages[i]);
          return;
        }
      }


    }

  }
  getYearChartData(channelId) {
    this.common.showLoading();
    let yearStart = moment().startOf('year').toDate();
    let yearEnd = moment().endOf('year').toDate();
    console.log(yearStart);
    console.log(yearEnd);
    let obj = {
      "channelId": channelId,
      importFrom: yearStart,
      importTo: yearEnd,
    }
    this.apiService.post(this.constantsService.scheduledMessageCountYearWise, obj).subscribe((succ: any) => {
      this.common.hideLoading();

      if (succ.code == 200) {

        const weekStart = moment().startOf('year');

        const days = [];
        for (let i = 0; i < 13; i++) {
          days.push(
            {
              "day": moment(weekStart).add(i, 'month').format('MMM'),
              "date": moment(weekStart).add(i, 'month'),
              "SUCCESS": 0,
              "FAILURE": 0,
              "OPTOUT": 0,
              "PENDING": 0,
            }

          );
        }

        console.log(days)

        let countData = succ.data;

        for (let i = 0; i < countData.length; i++) {
          // console.log(moment(countData[i].scheduleDate).format("DD/MM/YYYY"));

          for (let j = 0; j < days.length - 1; j++) {
            if (moment(days[j].date) <= moment(countData[i].scheduleDate) && moment(days[j + 1].date) >= moment(countData[i].scheduleDate)) {

              if (countData[i].deliveryStatus == 1)
                days[j].SUCCESS = days[j].SUCCESS + 1;
              else if (countData[i].deliveryStatus == 2)
                days[j].FAILURE = days[j].FAILURE + 1;
              else if (countData[i].deliveryStatus == 6)
                days[j].OPTOUT = days[j].OPTOUT + 1;
              else if (countData[i].deliveryStatus == 3)
                days[j].PENDING = days[j].PENDING + 1;

              break;
            }
          }




        }

        this.setSchedulWeekChart(days);
      }

    }, err => {
      this.common.hideLoading();


    })
  }
  viewDropDownChange(event) {

    if (event.target.value == 'This Year') {
      this.getYearChartData(this.currentChannel);
      this.currentChart = 'yearChart'
    } else {
      this.getWeekChartData(1);
      this.currentChart = 'weekChart'

    }
  }
  refresh() {
    this.activeTab = 1;
    this.dataFrom = "This Week";
    this.ngOnInit();
    // this.getPendingData();
  }
  tabClick(data) {

    this.activeTab = data;
    this.currentChannel = data;
    if (this.currentChart == 'yearChart') {
      this.getYearChartData(this.currentChannel);
      this.currentChart = 'yearChart'
    } else {
      this.getWeekChartData(this.currentChannel);
      this.currentChart = 'weekChart'

    }

  }
  // calendar begins

  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  weeks: CalendarDate[][] = [];

  sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];

  @Output() onSelectDate = new EventEmitter<CalendarDate>();



  ngOnChanges(changes: SimpleChanges): void {

    if (changes.selectedDates &&

      changes.selectedDates.currentValue &&

      changes.selectedDates.currentValue.length > 1) {

      // sort on date changes for better performance when range checking

      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());

      this.generateCalendar();

    }

  }

  // date checkers

  isToday(date: moment.Moment): boolean {

    return moment().isSame(moment(date), 'day');

  }

  isSelected(date: moment.Moment): boolean {

    return _.findIndex(this.selectedDates, (selectedDate) => {

      return moment(date).isSame(selectedDate.mDate, 'day');

    }) > -1;

  }

  isSelectedMonth(date: moment.Moment): boolean {

    return moment(date).isSame(this.currentDate, 'month');

  }
  previousDaySelect: CalendarDate;
  selectDate(date: CalendarDate): void {

    // if (!date.count && !date.promoCount) {
    //   return;
    // }
    this.onSelectDate.emit(date);

    this.getScheduleListByDateClick(date.mDate.format("DD/MM/YYYY"))

    date.selected = true;
    if (this.previousDaySelect)
      this.previousDaySelect.selected = false;
    this.previousDaySelect = date;

  }
  getScheduleListByDateClick(date) {
    let data = { fromDate: date };
    this.schedules = []
    this.common.showLoading();
    this.apiService.post(this.constantsService.getScheduleDetailsByDate, data).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading();

      if (succ.code == 200) {
        for (let i = 0; i < succ.data.length; i++) {
          this.schedules.push(succ.data[i])
        }
        // this.schedules = succ.data;
      }
      // this.scheduleMonthList = succ.data;
      // this.generateCalendar();

    }, err => {
      this.common.hideLoading();


    })

    this.common.showLoading();
    this.apiService.post(this.constantsService.getPromoDetailsByDate, data).subscribe((succ: any) => {
      this.common.hideLoading();
      console.log(succ);
      if (succ.code == 200) {
        // this.schedules = succ.data;
        for (let i = 0; i < succ.data.length; i++) {
          this.schedules.push(succ.data[i])
        }
      }
      // this.scheduleMonthList = succ.data;
      // this.generateCalendar();

    }, err => {
      this.common.hideLoading();


    })


  }
  // actions from calendar

  prevMonth(): void {

    this.currentDate = moment(this.currentDate).subtract(1, 'months');


    if (moment(this.currentDate).format("MMMM") == 'December') {
      const cDate = this.currentDate
      this.nextYearString = moment(cDate).add(1, 'year').format('YYYY');
      this.preYearString = moment(cDate).subtract(1, 'year').format('YYYY');
    }
    let data = {
      fromDate: this.currentDate.format("DD/MM/YYYY")
    }
    this.getSchduleMonthCount(data)
    this.schedules = [];
  }

  nextMonth(): void {

    this.currentDate = moment(this.currentDate).add(1, 'months');

    if (moment(this.currentDate).format("MMMM") == 'January') {
      const cDate = this.currentDate
      this.nextYearString = moment(cDate).add(1, 'year').format('YYYY');
      this.preYearString = moment(cDate).subtract(1, 'year').format('YYYY');
    }
    let data = {
      fromDate: this.currentDate.format("DD/MM/YYYY")
    }
    this.getSchduleMonthCount(data)
    this.schedules = [];
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');

    this.generateCalendar();

  }

  lastMonth(): void {


    this.currentDate = moment(this.currentDate).endOf('year');

    this.generateCalendar();

  }

  prevYear(): void {

    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    const cDate = this.currentDate
    this.nextYearString = moment(cDate).add(1, 'year').format('YYYY');
    this.preYearString = moment(cDate).subtract(1, 'year').format('YYYY');
    let data = {
      fromDate: this.currentDate.format("DD/MM/YYYY")
    }
    this.getSchduleMonthCount(data)
    this.schedules = [];
  }

  nextYear(): void {

    this.currentDate = moment(this.currentDate).add(1, 'year');
    const cDate = this.currentDate
    this.nextYearString = moment(cDate).add(1, 'year').format('YYYY');
    this.preYearString = moment(cDate).subtract(1, 'year').format('YYYY');
    let data = {
      fromDate: this.currentDate.format("DD/MM/YYYY")
    }
    this.getSchduleMonthCount(data)
    this.schedules = [];
  }

  // generate the calendar grid

  generateCalendar(): void {

    const dates = this.fillDates(this.currentDate);

    const weeks: CalendarDate[][] = [];

    while (dates.length > 0) {

      weeks.push(dates.splice(0, 7));

    }

    this.weeks = weeks;

  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {

    const firstOfMonth = moment(currentMoment).startOf('month').day();

    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');

    const start = firstDayOfGrid.date();

    return _.range(start, start + 42)

      .map((date: number): CalendarDate => {

        const d = moment(firstDayOfGrid).date(date);
        const formatDate = moment(d).format('DD/MM/YYYY')
        if (this.scheduleMonthList[formatDate] && this.promoList[formatDate]) {
          let data = this.scheduleMonthList[formatDate];
          let promoCount = this.promoList[formatDate];

          return {

            today: this.isToday(d),

            selected: this.isSelected(d),

            mDate: d,
            count: data,
            promoCount: promoCount


          };
        }
        if (this.scheduleMonthList[formatDate]) {
          let data = this.scheduleMonthList[formatDate];


          return {

            today: this.isToday(d),

            selected: this.isSelected(d),

            mDate: d,
            count: data,
            promoCount: 0


          };
        } else if (this.promoList[formatDate]) {

          let promoCount = this.promoList[formatDate];

          return {

            today: this.isToday(d),

            selected: this.isSelected(d),

            mDate: d,
            count: 0,
            promoCount: promoCount


          };
        }
        return {

          today: this.isToday(d),

          selected: this.isSelected(d),

          mDate: d,
          count: 0,
          promoCount: 0,


        };

      });

  }



  cancel() {
    $('#quick-modal').modal('hide')

  }
  toggleVisibility(menu) {

  }
  getPendingData() {
    let obj = {
      isCampaignManagementChecker: this.checker.campaignManagement,
      isCampaignMessageChecker: this.checker.campaignMessage,
      isCustomerChecker: this.checker.manageCustomer,
      isUserChecker: this.checker.manageUser,
      isRoleChecker: this.checker.rolePrivilege,

      isMessageTemplateChecker: this.checker.messageTemplate,
      isPromoMarketingChecker: this.checker.promoMarketing,
      isManagerServiceChecker: this.checker.managerService,
      isTemplateParameterChecker: this.checker.templateParameter



    }
    this.apiService.post(this.constantsService.getCampaignPendingCount, obj).subscribe((succ: any) => {
      console.log(succ);
      if (succ.code == 200)
        this.campaignPendingData = succ.data;
    }, err => {

    })
    // user details

    this.apiService.post(this.constantsService.getUserPendingCount, obj).subscribe((succ: any) => {
      console.log(succ);
      if (succ.code == 200) {
        this.userPendingData.active = "user"
        this.userPendingData.userData = [
          {
            "management": "User",
            "Draft": succ.data.userDraft,
            "Pending": succ.data.userPending,
            "Return": succ.data.userReturn,
            // "dummy": 0,
            // "dummy1": 0,
            // "dummy2": 0,
            // "dummy3": 0,
            // "dummy4": 0,

          }];
        this.userPendingData.roleData = [
          {
            "management": "Role",
            "Draft": succ.data.roleDraft,
            "Pending": succ.data.rolePending,
            "Return": succ.data.roleReturn,
            // "dummy": 0,
            // "dummy1": 0,
            // "dummy2": 0,
            // "dummy3": 0,
            // "dummy4": 0,
          }];

        if (this.pages.manageUser == true) {
          // this.setUserPendingChart(this.userPendingData.userData);
          this.userPendingData.active = "user"

        }
        else if (this.pages.rolePrivilege == true) {
          this.userPendingData.active = "role"

          // this.setUserPendingChart(this.userPendingData.roleData);

        }

      }
    }, err => {

    })
    this.apiService.post(this.constantsService.getServicePendingCount, obj).subscribe((succ: any) => {
      console.log(succ);
      if (succ.code == 200) {

        this.serviceChartData = {
          service: [
            {
              pendingData: "Draft",
              count: succ.data.serviceDraft,
              color: am4core.color("#103141")

            }, {
              pendingData: "Pending For Approval",
              count: succ.data.servicePending,
              color: am4core.color("#7DACC6")


            },
            {
              pendingData: "Return to maker- Reopen",
              count: succ.data.serviceReturn,
              color: am4core.color("#F0D757")

            }
          ],
          promo: [
            {
              pendingData: "Draft",
              count: succ.data.promoDraft,
              color: am4core.color("#103141")

            }, {
              pendingData: "Pending For Approval",
              count: succ.data.promoPending,
              color: am4core.color("#7DACC6")


            },
            {
              pendingData: "Return to maker- Reopen",
              count: succ.data.promoReturn,
              color: am4core.color("#F0D757")

            }

          ],
          messageTemplate: [

            {
              pendingData: "Draft",
              count: succ.data.messageDraft,
              "color": am4core.color("#103141")

            }, {
              pendingData: "Pending For Approval",
              count: succ.data.messagePending,
              color: am4core.color("#7DACC6")


            },
            {
              pendingData: "Return to maker- Reopen",
              count: succ.data.messageReturn,
              color: am4core.color("#F0D757")

            }
          ],
          templateParameter: [
            {
              pendingData: "Draft",
              count: succ.data.temlateDraft,
              color: am4core.color("#103141")

            }, {
              pendingData: "Pending For Approval",
              count: succ.data.templatePending,
              color: am4core.color("#7DACC6")


            },
            {
              pendingData: "Return to maker- Reopen",
              count: succ.data.templateReturn,
              color: am4core.color("#F0D757")

            }

          ]
        }
        this.setServiceChart(this.serviceChartData);
      }
      // this.campaignPendingData=succ.data;
    }, err => {

    })
  }
  setServiceChart(data) {
    am4core.ready(function () {
      let chart = am4core.create("serviceChart", am4charts.PieChart);

      // Create series
      // Add and configure Series
      chart.data = data.service;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      var colorSet = new am4core.ColorSet();
      colorSet.list = ["#103141", "#7DACC6", "#F0D757"].map(function (color) {
        return am4core.color(color);
      });
      pieSeries.colors = colorSet;
      pieSeries.labels.template.text = "{pendingData}: {count}";
      pieSeries.slices.template.tooltipText = "{pendingData}: {count}";
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "pendingData";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{count}";
      pieSeries.labels.template.radius = am4core.percent(-40);
      pieSeries.labels.template.fill = am4core.color("white");


      pieSeries.ticks.template.events.on("ready", hideSmall);
      pieSeries.ticks.template.events.on("visibilitychanged", hideSmall);
      pieSeries.labels.template.events.on("ready", hideSmall);
      pieSeries.labels.template.events.on("visibilitychanged", hideSmall);

      function hideSmall(ev) {
        if (ev.target.dataItem && (ev.target.dataItem.values.value.percent < 5)) {
          ev.target.hide();
        }
        else {
          ev.target.show();
        }
      }
      // this.serviceChartId = chart;
    });
    am4core.ready(function () {
      let chart = am4core.create("promoChart", am4charts.PieChart);

      // chart.radius = am4core.percent(100);

      // Create series
      // Add and configure Series
      chart.data = data.promo;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      var colorSet = new am4core.ColorSet();
      colorSet.list = ["#103141", "#7DACC6", "#F0D757"].map(function (color) {
        return am4core.color(color);
      });
      pieSeries.colors = colorSet;
      pieSeries.labels.template.text = "{pendingData}: {count}";
      pieSeries.slices.template.tooltipText = "{pendingData}: {count}";
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "pendingData";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{count}";
      pieSeries.labels.template.radius = am4core.percent(-40);
      pieSeries.labels.template.fill = am4core.color("white");

      pieSeries.ticks.template.events.on("ready", hideSmall);
      pieSeries.ticks.template.events.on("visibilitychanged", hideSmall);
      pieSeries.labels.template.events.on("ready", hideSmall);
      pieSeries.labels.template.events.on("visibilitychanged", hideSmall);

      function hideSmall(ev) {
        if (ev.target.dataItem && (ev.target.dataItem.values.value.percent < 5)) {
          ev.target.hide();
        }
        else {
          ev.target.show();
        }
      }
      // this.promoChartId = chart;
    });
    am4core.ready(function () {
      let chart = am4core.create("messageChart", am4charts.PieChart);

      // Create series
      // Add and configure Series
      chart.data = data.messageTemplate;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      var colorSet = new am4core.ColorSet();
      colorSet.list = ["#103141", "#7DACC6", "#F0D757"].map(function (color) {
        return am4core.color(color);
      });
      pieSeries.colors = colorSet;
      pieSeries.labels.template.text = "{pendingData}: {count}";
      pieSeries.slices.template.tooltipText = "{pendingData}: {count}";
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "pendingData";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{count}";
      pieSeries.labels.template.radius = am4core.percent(-40);
      pieSeries.labels.template.fill = am4core.color("white");


      pieSeries.ticks.template.events.on("ready", hideSmall);
      pieSeries.ticks.template.events.on("visibilitychanged", hideSmall);
      pieSeries.labels.template.events.on("ready", hideSmall);
      pieSeries.labels.template.events.on("visibilitychanged", hideSmall);

      function hideSmall(ev) {
        if (ev.target.dataItem && (ev.target.dataItem.values.value.percent < 5)) {
          ev.target.hide();
        }
        else {
          ev.target.show();
        }
      }
      // this.messageChartId = chart;
    });
    am4core.ready(function () {
      let chart = am4core.create("templateChart", am4charts.PieChart);

      // Create series
      // Add and configure Series
      chart.data = data.templateParameter;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      var colorSet = new am4core.ColorSet();
      colorSet.list = ["#103141", "#7DACC6", "#F0D757"].map(function (color) {
        return am4core.color(color);
      });
      pieSeries.colors = colorSet;
      pieSeries.labels.template.text = "{pendingData}: {count}";
      pieSeries.slices.template.tooltipText = "{pendingData}: {count}";
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "pendingData";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{count}";
      pieSeries.labels.template.radius = am4core.percent(-40);
      pieSeries.labels.template.fill = am4core.color("white");


      pieSeries.ticks.template.events.on("ready", hideSmall);
      pieSeries.ticks.template.events.on("visibilitychanged", hideSmall);
      pieSeries.labels.template.events.on("ready", hideSmall);
      pieSeries.labels.template.events.on("visibilitychanged", hideSmall);

      function hideSmall(ev) {
        if (ev.target.dataItem && (ev.target.dataItem.values.value.percent < 5)) {
          ev.target.hide();
        }
        else {
          ev.target.show();
        }
      }
      // this.templateChartId = chart;
    });
  }
  usermangagementTab(data) {
    if (data == 'user') {
      this.userPendingData.active = "user"
      // this.setUserPendingChart(this.userPendingData.userData);
    } else {
      this.userPendingData.active = "role"
      // this.setUserPendingChart(this.userPendingData.roleData);
    }
  }
  gotoUserManagement() {

    if (this.userPendingData.active == 'user') {
      this.chartClick("Manage User");
    } else {
      this.chartClick("Role & Privileges");
    }
  }
  setUserPendingChart(data) {
    am4core.ready(function () {

      // this.zone.runOutsideAngular(() => {
      let chart = am4core.create("userChartdiv", am4charts.XYChart);


      chart.data = data;
      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "management";
      // categoryAxis.title.text = "Local country offices";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      // categoryAxis.renderer.cellStartLocation = 0.1;
      // categoryAxis.renderer.cellEndLocation = 0.9;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.maxPrecision = 0;
      // valueAxis.title.text = "Expenditure (M)";

      // Create series
      function createSeries(field, name, stacked) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "management";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
        series.stacked = stacked;
        series.columns.template.width = am4core.percent(20);
        // series.stroke = am4core.color("#ff0000"); // red
        if (name == 'Draft')
          series.columns.template.fill = am4core.color("#103141"); // sms fill
        else if (name == 'Pending For Approval')
          series.columns.template.fill = am4core.color("#7DACC6"); // sms fill
        else if (name == 'Return to maker- Reopen')
          series.columns.template.fill = am4core.color("#F0D757"); // sms fill
        else
          series.columns.template.fill = am4core.color("#27AAE1"); // sms fill


      }

      createSeries("Draft", "Draft", false);
      createSeries("Pending", "Pending For Approval", false);
      createSeries("Return", "Return to maker- Reopen", false);
      // createSeries("dummy", "Return to maker- Reopen", false);
      // createSeries("dummy1", "Return to maker- Reopen", false);
      // createSeries("dummy2", "Return to maker- Reopen", false);
      // createSeries("dummy3", "Return to maker- Reopen", false);
      // createSeries("dummy4", "Return to maker- Reopen", false);
      // createSeries("PENDING", "Pending", false);

      // Add legend
      chart.legend = new am4charts.Legend();
      let legendContainer = am4core.create("legenddiv", am4core.Container);
      legendContainer.width = am4core.percent(100);
      legendContainer.height = am4core.percent(100);
      chart.legend.parent = legendContainer;

      // this.userCharId = chart;
      // });

    });

  }
  chartClick(menu) {
    console.log(menu);
    let page;
    let mainPage;
    let mainPages = this.common.getMainPages();
    for (let i = 0; i < mainPages.length; i++) {

      var subPage = mainPages[i].page;

      for (var j = 0; j < subPage.length; j++) {
        if (subPage[j].menuLabel == menu) {
          page = subPage[j];
          mainPage = mainPages[i]
          break;
        }
      }


    }
    setTimeout(() => {
      this.common.setRole(page);
      this.common.setMainMenu(mainPage);
      this.router.navigate([page.menuUrl]);
    }, 500);

    // this.common.setRole(page);
    // this.common.setMainMenu(page);

  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartd) {
        this.chartd.dispose();
      }
    });
  }
}

