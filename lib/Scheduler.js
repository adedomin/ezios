/*
 * eZios: Monitoring daemon like nagios, but dynamically configurable.
 * Copyright (C) 2016 Anthony DeDominic <anthony@dedominic.pw>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var EventEmitter = require('events').EventEmitter

var Scheduler = function() {
    EventEmitter.call(this)
    this.tasks = {}
}

Scheduler.prototype = Object.create(EventEmitter.prototype)
Scheduler.prototype.constructor = Scheduler

Scheduler.prototype.addtask = function (host, service) {
    if (this.tasks[service._id]) {
        this.deltask(service)
    }

    this.emit('service.external', host, service)
    this.tasks[service._id] = setInterval(() => {
        this.emit('service.external', host, service)
    }, service.interval)
}

Scheduler.prototype.deltask = function (service) {
    clearInterval(this.tasks[service._id])
    delete this.tasks[service._id]
}

module.exports = Scheduler
