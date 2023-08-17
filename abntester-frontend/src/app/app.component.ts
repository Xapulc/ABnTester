import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  constructor(private router: Router) {
  }

  title = 'abntester-frontend';

  links = [
    {
      routeLink: '/calculation/one-sample',
      displayName: 'Одна выборка',
    },
    {
      routeLink: '/calculation/two-sample',
      displayName: 'Две выборки',
    },
  ]

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
