import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routerTransitionSlide} from 'src/app/animation/routable.animations';
import {FormService} from '../services/form.service';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {InputService} from '../services/input.service';
import {Observable, interval} from 'rxjs';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  animations: [
    routerTransitionSlide
  ]
})
export class HomeContainerComponent implements OnInit {
  formData = {
    formType: [],
    formTypeForNewProductInKit: [],
    requestType: [],
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    productColorList: [],
    applicantList: [],
    licenseHolderList: [],
    licenseHolderCountryList: [],
    physicalStateList: [],
    purposeOfUseList: [],
    typeOfPackagingList: [],
    unitOfMeasureList: [],
    ingrediantList: [],
    functionList: [],
    storagePlaceList: [],
    trackType: []
  };
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  companyProfileId: any;
  username;
  unseenCount;
  currentLang;

  constructor(private inputService: InputService, private getService: FormService) {
    interval(10000).subscribe(x => { // will execute every 30 seconds
      this.getNotificationNumber();
    });
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.companyProfileId = res.payload;
    });


    this.isLoading = true;

    this.getService.getMarketingTypeLookUp().subscribe((res: any) => {
      this.formData.formType = res;
      if (res) {
        this.formData.formTypeForNewProductInKit = res.filter(x => x.ID === 1 || x.ID === 3).map(x => x);
      }
    }, error => this.handleError(error), () => {
      this.getService.getRequestTypeLookUp().subscribe((res: any) => {
        this.formData.requestType = res;
      }, error => this.handleError(error), () => {
        this.getService.getCountryLookUp().subscribe((res: any) => {
          this.formData.manufacturingCountryList = res;
          this.formData.licenseHolderCountryList = res;
        }, error => this.handleError(error), () => {
          this.getService.getManufacturingCompanyLookUp(1, '').subscribe((res: any) => {
            this.formData.manufacturingCompanyList = res;
            this.formData.licenseHolderList = res;
          }, error => this.handleError(error), () => {
            this.getService.getFunctionLookUp().subscribe((res: any) => {
              this.formData.functionList = res;
            }, error => this.handleError(error), () => {
              this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
                this.formData.typeOfPackagingList = res;
              }, error => this.handleError(error), () => {
                this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
                  this.formData.physicalStateList = res;
                }, error => this.handleError(error), () => {
                  this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
                    this.formData.unitOfMeasureList = res;
                  }, error => this.handleError(error), () => {
                    this.getService.getUsePurposeLookUp().subscribe((res: any) => {
                      this.formData.purposeOfUseList = res;
                    }, error => this.handleError(error), () => {
                      this.getService.getProductColorLookUp().subscribe((res: any) => {
                        this.formData.productColorList = res;
                      }, error => this.handleError(error), () => {
                        this.getService.getProductIngrediantsLookUp(1, '').subscribe((res: any) => {
                          this.formData.ingrediantList = res;
                        }, error => this.handleError(error), () => {
                          this.getService.getCompanyProfileLookUp(1, this.companyProfileId, '').subscribe((res: any) => {
                            this.formData.applicantList = res;

                            this.formData.applicantList.filter(option => option.ID === this.companyProfileId).map(x => {
                              this.username = x.NAME;
                            });
                          }, error => this.handleError(error), () => {
                            this.getService.getStoragePlaceLookUp().subscribe((res: any) => {
                              this.formData.storagePlaceList = res;
                            }, error => this.handleError(error), () => {
                              this.getService.getTrackTypeLookUp().subscribe((res: any) => {
                                this.formData.trackType = res;
                              }, error => this.handleError(error), () => {
                                this.isLoading = false;

                                this.inputService.publish({type: 'allLookups', payload: this.formData});
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'notificationUnreadCount'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.unseenCount = res.payload.filter(x => !x.f_seen).map(list => list).length;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 10000);
  }

  getNotificationNumber() {
    this.getService.getNotificationLogsList().subscribe((res: any) => {
      this.isLoading = false;

      this.unseenCount = res.filter(x => !x.f_seen).map(list => list).length;
    }, error => this.handleError(error));
  }

  changeLang(event) {
    this.currentLang = event;

    this.inputService.publish({type: 'currentLang', payload: this.currentLang})
  }
}
