import { Component, OnInit } from '@angular/core'
import { AuthService } from '@app/core'
import { ListOverflowItem } from '@app/shared/shared-main'
import { I18n } from '@ngx-translate/i18n-polyfill'
import { UserRight } from '@shared/models'

@Component({
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  items: ListOverflowItem[] = []

  constructor (
    private auth: AuthService,
    private i18n: I18n
  ) {}

  ngOnInit () {
    if (this.hasUsersRight()) this.items.push({ label: this.i18n('Users'), routerLink: '/admin/users' })
    if (this.hasServerFollowRight()) this.items.push({ label: this.i18n('Follows & redundancies'), routerLink: '/admin/follows' })
    if (this.hasVideoAbusesRight() || this.hasVideoBlocklistRight()) this.items.push({ label: this.i18n('Moderation'), routerLink: '/admin/moderation' })
    if (this.hasConfigRight()) this.items.push({ label: this.i18n('Configuration'), routerLink: '/admin/config' })
    if (this.hasPluginsRight()) this.items.push({ label: this.i18n('Plugins/Themes'), routerLink: '/admin/plugins' })
    if (this.hasJobsRight() || this.hasLogsRight() || this.hasDebugRight()) this.items.push({ label: this.i18n('System'), routerLink: '/admin/system' })
  }

  hasUsersRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_USERS)
  }

  hasServerFollowRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_SERVER_FOLLOW)
  }

  hasVideoAbusesRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_VIDEO_ABUSES)
  }

  hasVideoBlocklistRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_VIDEO_BLACKLIST)
  }

  hasConfigRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_CONFIGURATION)
  }

  hasPluginsRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_PLUGINS)
  }

  hasLogsRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_LOGS)
  }

  hasJobsRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_JOBS)
  }

  hasDebugRight () {
    return this.auth.getUser().hasRight(UserRight.MANAGE_DEBUG)
  }
}
