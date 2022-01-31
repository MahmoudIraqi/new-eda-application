import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormService} from '../../services/form.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() filterData;
  @Input() removeFilterKey;
  filterRow = [];
  keyForFilter;
  keyWordsForFilter;
  keysForTrackType;
  keysForTrackTypeList;
  @Output() selectedFilteredData = new EventEmitter();

  constructor(private getService: FormService) {
  }

  ngOnChanges() {
    if (this.removeFilterKey) {
      this.keyWordsForFilter = '';
    }
  }

  ngOnInit(): void {
    // this.getService.getTrackTypeLookUp().subscribe((res: any) => {
    //   this.keysForTrackTypeList = res;
    // });
  }

  setTheFilteredData() {
    this.selectedFilteredData.emit({
      keyForFilter: this.keyForFilter,
      keyWordsForFilter: this.keyWordsForFilter,
      filterRow: this.filterRow
    });
  }

  addFilteredRow() {
    this.filterRow.push({columnName: this.keyForFilter.name, keyword: this.keyWordsForFilter});
    this.keyForFilter = '';
    this.keyWordsForFilter = '';

    this.setTheFilteredData();
  }

  removeKeywordFromFilter(i) {
    this.filterRow.splice(i);

    this.setTheFilteredData();
  }

}
