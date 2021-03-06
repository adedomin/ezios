/*
 * Copyright 2016 prussian <genunrest@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var html = require('choo/html'),
    navItems = {
        monjs: '#/status',
        hosts: '#/host',
        services: '#/service',
        notify: '#/notify'
    }

module.exports = (state, send) => {
    var hash = window.location.hash
    if (!hash) hash = '#/status'
    return html`
      <nav class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            ${Object.keys(navItems).map(nav => {
                if (navItems[nav].indexOf(hash) > -1) return html`
                    <a href="${navItems[nav]}" class="nav-item is-tab is-active">${nav}</a>
                `
                return html`
                    <a href="${navItems[nav]}" class="nav-item is-tab">${nav}</a>
                `
            })}
          </div>
          <div class="nav-right nav-menu">
            <span class="nav-item">
              <p class="control has-addons">
                <span class="select">
                  <select onchange=${(e) => send('filterTargetChange', e.target.value)}>
                    <option value="host">host</option>
                    <option value="service">service</option>
                  </select>
                </span>
                <input
                  type="text"
                  class="input is-expanded" 
                  hint="filter by hostname"
                  value="${state.filter}"
                  placeholder="Filter by ${state.filterTarget}"
                  oninput=${(e) => send('filterChange', e.target.value)}>
              </p>
            </span>
          </div>
        </div>
      </nav>
    `
}
