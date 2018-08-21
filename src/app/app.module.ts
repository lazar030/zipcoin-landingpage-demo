// Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components Import
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { TokenComponent } from './components/token/token.component';
import { TeamComponent } from './components/team/team.component';
import { AboutComponent } from './components/about/about.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StepsComponent } from './components/steps/steps.component';
import { BackgroundComponent } from './components/background/background.component';
import { FeaturesComponent } from './components/features/features.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { ChartComponent } from './components/chart/chart.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { CoinsComponent } from './components/coins/coins.component';
import { RoundsOfTokenComponent } from './components/rounds-of-token/rounds-of-token.component';
import { ClockComponent } from './components/clock/clock.component';

const  appRoutes: Routes = [
  { path: '', component: MainComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ContactComponent,
    TokenComponent,
    TeamComponent,
    AboutComponent,
    BenefitsComponent,
    NavbarComponent,
    StepsComponent,
    BackgroundComponent,
    FeaturesComponent,
    RoadmapComponent,
    PrivacyComponent,
    TermsConditionsComponent,
    TokensComponent,
    ChartComponent,
    TermsOfUseComponent,
    CoinsComponent,
    RoundsOfTokenComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(appRoutes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
