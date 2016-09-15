// angular2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

import 'rxjs';
import 'jquery';
import 'bootstrap-loader';
import 'font-awesome-sass-loader';
import 'lodash';

if (ENV === 'production') {
  // prod
} else {
  // dev
  require('angular2-hmr');
}
