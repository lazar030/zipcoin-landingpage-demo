import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  // team: any;
  team = [
    {
      name: 'Cathrine (Kim) Chivhima',
      title: 'CEO & COO',
      desc: "Blockchain, ICO & Cryptocurrency inspired,evangelist and enthusiast Leads globally direction of ZipCoin Operations Oversees the Exchange & Trading solution strategy Leads Banking and Fintech solution strategy Oversees ZipCoin Process and system governance Leads and oversees the ICO and exchange development Leads and manages"
    },
    {
      name: 'Lazar Jankovic',
      title: 'Fullstack JavaScript Developer',
      desc: 'Young developer on the rise. Lazar brings in creativity, and energy in the coding world. Experience using React, Express, AngularJs, Blockchain, Ionic, Node js, Sails JS, Typescript, CSS3/4, HTML5, Php, Laravel developer.'
    },
    {
      name: 'Alexey Bryansky',
      title:  'CTO and Software Engineer Lead',
      desc: 'Alexey is senior data scientist and a full stack, Blockchain, Web, Solidity, DApp, and smart contract developer. Excels in building in house IT talent, proprietary trading engines, innovative IT and blockchain technologies. During spare time Alexey enjoys spending time with his kids, family and friends.'
    },
    {
      name: 'Lydia Tirivepi',
      title: 'Chairwoman of the Board &Strategic Business Partner - Africa',
      desc: 'Seasoned Consultant for various fortune 500 companies and start ups Board member for CATHCA Entrepreneur with extensive international background, developing and implementing of programs and strategies at local, state and federal/ Govt levels. Public Relations Professional. Blockchain enthusiast'
    },
    {
      name: 'Weston Madawo',
      title: 'Community Manager',
      desc: 'Professional Pilot- VVIP & Corp Flying aerobatics and pilot trainer Former Military combat for Zim Highest flying Airforce ranking in Zimabwe Active networker Successful forex and crypto trader Blockchain evangelist and BITCOIN miner'
    },
    {
      name: 'Tawanda Tore',
      title: 'Blockchain and Community Director (North America)',
      desc: 'Logistic and courier  delivery Management  professional  ICO investor  Cryprocurrency trader  Blockchain Technology  Evangelist & Enthusiast  Businessman and  Entrepreneur  Community builder and  networker.'
    },
    {
      name: 'Alexandar Chebanenko',
      title: 'Blockchain, Front and Back end Developer',
      desc: 'Entrepreneur and an experienced developer in Trading engines, ICO, Exchanges and enterprise systems. Loves writing code in different languages and developing innovating systems using blockchain technologies.'
    },
    {
      name: 'Annaise Dushmine',
      title: 'Tax Advisor and Community Manager',
      desc: 'Currently studying Masters degree in Tax law in the Netherlands. Worked with reputable Big five accounting firms- EY, RSM, etc. Board member of IamSHERO , a non profit organization in the Netherlands. Blockchain and ICO enthusiast. A community leader, mentor, networker and relationship builder with local news an radio media. Annaise speaks three languages fluently: Dutch, English and French.'
    }
  ]

  team2 = [
    {
      name: 'Chioma Stella Ikechukwu (Nee Ujunwa)',
      title: "Blockchain and Community Director(Africa)",
      desc: 'Entrepreneur, CEO of Jostarz multi services Ltd, President of Megacashsaver cooperative society Motivational speaker ICO Investor'
    }, 
    {
      name: 'John Omogbai',
      title: 'Compliance Officer and Corp Trainer',
      desc: 'CEO of Giant Scrapper Ltd Crypto trader, Safety professional Motivational speaker/trainer Corporate trainer and compliance officer Blockchain Technology crusader & networker Blockchain Enthusiast. Founder of the Crew a multiple media firm'
    },
    {
      name: 'Ola Dada',
      title: 'CFO & Market Strategist',
      desc: 'Extensive knowledge in Banking Operations, Wealth Management, Financial advising, Cash Management and Trading sectors During spare time, Ola loves spending time with his kids, family and financial networking landscape'
    },
    {
      name: 'Leah Marisa',
      title: 'Community Manager',
      desc: 'Hotel Management professional Block chain enthusiast Community Manager and a networker Cryptocurrency trader Customer service focused & believes in “customer is always right” philosophy. Businesswoman and entrepreneur'
    },
    {
      name: 'Sipho Brian Sebele',
      title: 'Sales & Marketing Director',
      desc: 'Extensive Marketing, Strategic Planning, Business Development and Advertising knowledge using digital marketing tools. An inspired, experienced blogger and news writing. Entrepreneur, Blockchain and cryptocurrency enthusiast.'
    },
    {
      name: 'Bolouebi (Ebi) Solomon',
      title: 'Corporate Governance Officer Blockchain & Community Director - EUROPE',
      desc: 'Experienced Corporate Governance & HR practitioner Blockchain enthusiast and Community leader who thrives in providing un- bias customer experience Excels in mentoring, delivering education, networking and awareness of blockchain while building strong and meaningful blockchain communities.'
    }
  ]
  constructor() { }

  ngOnInit() {
    console.log('This is All from My TEAM: ', this.team);
  }

}
