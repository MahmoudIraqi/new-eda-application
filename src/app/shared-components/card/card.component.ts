import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CardsList, ServicesPerAdminAfterIntegrating} from "../../../utils/common-models";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {InputService} from "../../services/input.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() itemData: ServicesPerAdminAfterIntegrating;
  @Input() serviceTypeId: number;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  showCardDetails: boolean;

  constructor(public translateService: TranslateService,
              private inputService: InputService,
              private router: Router) {
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }

  showDetails() {
    this.showCardDetails = true;
  }

  hideDetails() {
    this.showCardDetails = false;
  }

  goToLink(link: string, serviceId?: number, serviceTypeId?: number) {
    this.router.navigateByUrl(serviceId ? `${link}/${serviceId}/${serviceTypeId}` : link)
  }
}
