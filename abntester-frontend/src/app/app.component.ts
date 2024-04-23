import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {FormControl} from "@angular/forms";
import {tuiItemsHandlersProvider} from '@taiga-ui/kit';
import {DesignType, Displayable, SampleType} from "./main/menu-types.model";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    tuiItemsHandlersProvider({
      stringify: (item: Displayable) => `${item.displayName}`,
    }),
  ],
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }


  designTypes: Displayable[] = [
    {key: DesignType.CLASSIC, displayName: 'Классический дизайн'},
    {key: DesignType.SEQUENTIAL, displayName: 'Последовательный анализ'},
  ]
  designTypesFormControl = new FormControl(this.designTypes[0])

  numberOfSamples: Displayable[] = [
    {key: SampleType.ONE_SAMPLE, displayName: 'Одна выборка'},
    {key: SampleType.TWO_SAMPLE, displayName: 'Две выборки'},
  ]
  numberOfSamplesFormControl = new FormControl(this.numberOfSamples[1])

  links = [
    {
      routeLink: '/calculation/one-sample',
      designType: DesignType.CLASSIC,
      numberOfSamples: SampleType.ONE_SAMPLE,
    },
    {
      routeLink: '/calculation/two-sample',
      designType: DesignType.CLASSIC,
      numberOfSamples: SampleType.TWO_SAMPLE,
    },
    {
      routeLink: '/calculation/sequential-one-sample',
      designType: DesignType.SEQUENTIAL,
      numberOfSamples: SampleType.ONE_SAMPLE,
    },
    {
      routeLink: '/calculation/sequential-two-sample',
      designType: DesignType.SEQUENTIAL,
      numberOfSamples: SampleType.TWO_SAMPLE,
    },
  ]

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1)
    ).subscribe(
      _ => this.initNavigation()
    )
  }

  initNavigation() {
    this.fillFormValuesFromRoute()
    this.numberOfSamplesFormControl.valueChanges.subscribe(_ => this.handlePageChanged())
    this.designTypesFormControl.valueChanges.subscribe(_ => this.handlePageChanged())
  }

  fillFormValuesFromRoute() {
    const activeLink = this.links.find(el => this.router.url.startsWith(el.routeLink))
    if (!activeLink) {
      return
    }
    const activeDesignType = this.designTypes.find(el => el.key == activeLink.designType)
    const activeSampleType = this.numberOfSamples.find(el => el.key == activeLink.numberOfSamples)
    if (!activeDesignType || !activeSampleType) {
      return
    }
    this.designTypesFormControl.setValue(activeDesignType)
    this.numberOfSamplesFormControl.setValue(activeSampleType)
  }

  handlePageChanged() {
    const designType = this.designTypesFormControl.value?.key
    const sampleType = this.numberOfSamplesFormControl.value?.key
    if (!designType || !sampleType) {
      return
    }
    const link = this.links.find(value => value.designType == designType && value.numberOfSamples == sampleType)
    if (!link) {
      console.warn(`Not found route by designType=${designType} and samepleType=${sampleType}`)
      return
    }
    this.navigate(link.routeLink)
  }

  get activeItemIndex() {
    return this.links.findIndex(el => this.router.url.startsWith(el.routeLink))
  }

  isSelectedTab(tab: any) {
    const tabRouteLink = tab.routeLink
    return this.router.url.startsWith(tabRouteLink)
  }

  navigate(routeLink: string) {
    this.router.navigate([routeLink])
  }
}
