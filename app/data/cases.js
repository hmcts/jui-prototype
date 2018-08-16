var types = require('./types');
var uuid = require('uuid/v4');
var moment = require('moment');

module.exports = [
  {
    id: 'FR1231612322',
    typeId: types.fr.id,
    status: '<a href="/app/cases/FR1231612322/documents/1">Draft consent order</a>',
    applicationDate: moment('2017-11-20 13:01'),
    lastAction: moment('2018-01-25 16:48'),
    tribunalCentre: 'Fox Court',
    requirements: 'Assisted Digital support requested',
    decreeDate: moment('2018-05-01 13:01'),
    events: [
      {
        id: uuid(),
        date: moment('2018-05-20 13:01'),
        title: 'D8 submitted',
        by: 'John Smith'
      },
      {
        id: uuid(),
        date: moment('2018-05-20 13:02'),
        title: 'Statement of information (D81) submitted',
        by: 'John Smith'
      },
      {
        id: uuid(),
        date: moment('2018-05-20 13:03'),
        title: 'Form A submitted',
        by: 'John Smith'
      },
      {
        id: uuid(),
        date: moment('2018-05-20 13:04'),
        title: 'Draft consent order submitted',
        by: 'John Smith'
      }
    ],
    parties: [
      {
        type: 'Petitioner',
        firstName: 'John',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Jane',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    documents: [{
      id: '1',
      label: 'Draft consent order'
    }, {
      id: '3',
      label: 'Statement of information (D81)'
    }, {
      id: '2',
      label: 'Form A'
    }, {
      id: '4',
      label: 'Grant of decree nisi'
    }],
    linkedCases: [{
      type: 'Divorce',
      id: 'BV18D00153'
    }]
  },

  {
    id: 'SC1231612322',
    typeId: types.pip.id,
    status: '<a href="#">Appellant’s reply</a>',
    applicationDate: moment('2017-11-20 13:01'),
    lastAction: moment('2018-01-25 16:48'),
    urgent: true,
    tribunalCentre: 'Fox Court',
    requirements: 'Assisted Digital support requested',
    documents: [{
      id: '1-w',
      label: 'Personal independence payment'
    }, {
      id: '2-w',
      label: 'Decision notice'
    }],
    events: [
      {
        id: uuid(),
        date: moment('2017-11-20 13:01'),
        title: 'New Direct Lodgement Registration',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-12-05 09:10'),
        title: 'Appeal marked as compliant',
        by: 'Tribunal Case Worker – Emily Oliver'
      },

      {
        id: uuid(),
        date: moment('2018-01-25 16:48'),
        title: 'Response submitted',
        by: 'DWP Appeals Officer'
      }

      // {
      //   id: uuid(),
      //   date: moment('2018-04-27 09:34'),
      //   title: 'Directions issued to appellant',
      //   by: 'Judge Prita Shah',
      //   documents: [
      //     {
      //       id: uuid(),
      //       name: 'Decision notice'
      //     },
      //     {
      //       id: uuid(),
      //       name: 'Application for decree nisi'
      //     }
      //   ]
      // }
    ],
    rounds: [{
      id: uuid(),
      dateSent: null,
      questions: []
    },{
      id: uuid(),
      dateSent: moment('2018-05-28').toDate(),
      questions: [{
        id: uuid(),
        subject: 'How do you do your shopping?',
        body: 'Explain how you do your shopping. Include information about how often you go to the shops, how you get there and how you get your food from the shops to your home.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-05-28').toDate(),
        dateCreated: moment('2018-05-28').toDate(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: new Date(),
          body: '<p>I have to walk to the bus stop, which is about 10 minutes from my house. I stop several times along the way. I can manage the bus, although getting off is very painful. I can only carry one bag, as my arms are too weak. I am exhasuted by the time I get home and in a lot of pain.</p>'
        }
      },
      {
        id: uuid(),
        subject: 'How do you prepare your meals?',
        body: 'Explain how you prepare your meals. Include information about the types of meals you eat, how you prepare them and whether there are any tasks in the kitchen you need assistance with.',
        author: 'Judge Prita Shah',
        dateChanged: new Date(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: moment('2018-05-28').toDate(),
          body: '<p>I only eat simple meals that I can put in the microwave. I find that I can\'t cut things with a knife as I do not have the strength.</p>'
        }
      },
      {
        id: uuid(),
        subject: 'How you wash yourself?',
        body: 'Explain how you wash yourself. Include information about whether you usually bath or shower.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-05-28').toDate(),
        dateCreated: moment('2018-05-28').toDate(),
        attachments: [],
        response: false
      }]
    }],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Warren',
        lastName: 'Sutton',
        representative: null
      },
      {
        type: 'Respondent',
        org: 'DWP',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637',
        decisionMaker: {
          firstName: 'Denise',
          lastName: 'Okenwe'
        },
        presentingOfficer: {
          firstName: 'Claire',
          lastName: 'Potter'
        }
      }
    ],
  },

  {
    id: 'SC1231612323',
    typeId: types.pip.id,
    documents: [{
      id: '1',
      label: 'Personal independence payment'
    }, {
      id: '2',
      label: 'Decision notice'
    }],
    rounds: [/*{
      id: uuid(),
      dateSent: null,
      questions: [{
        id: uuid(),
        subject: 'How do you do your shopping?',
        body: 'Explain how you do your shopping. Include information about how often you go to the shops, how you get there and how you get your food from the shops to your home.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-04-22').toDate(),
        dateCreated: moment('2018-04-22').toDate(),
        attachments: [],
        response: null
      }, {
        id: uuid(),
        subject: 'How you prepare your food?',
        body: 'Explain how you prepare your meals. Include information about the types of meals you eat, how you prepare them and whether there are any tasks in the kitchen you need assistance with.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-04-23').toDate(),
        dateCreated: moment('2018-04-23').toDate(),
        attachments: [],
        response: null
      }]
    },{
      id: uuid(),
      dateSent: moment('2018-04-20').toDate(),
      questions: [{
        id: uuid(),
        subject: 'How you wash yourself?',
        body: 'Explain how you wash yourself. Include information about whether you usually bath or shower.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-04-20').toDate(),
        dateCreated: moment('2018-04-20').toDate(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: moment('2018-04-21').toDate(),
          body: '<p>I have a walk-in bath and a shower but I don’t use the shower since the accident because I can’t put my arms above my head and it makes it painful.</p>'
        }
      }]
    }*/],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Alan',
        lastName: 'Jones',
        representative: null
      },
      {
        type: 'Respondent',
        org: 'DWP',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637',
        decisionMaker: {
          firstName: 'Denise',
          lastName: 'Okenwe'
        },
        presentingOfficer: {
          firstName: 'Claire',
          lastName: 'Potter'
        }
      }
    ],
    status: '<a href="#">Appellant’s reply</a>',
    applicationDate: moment('2018-05-09'),
    lastAction: moment('2018-05-09'),
    urgent: false,
    tribunalCentre: 'Fox Court',
    requirements: 'Hearing loop required',
    events: [
      {
        id: uuid(),
        date: moment('2017-11-20 13:01'),
        title: 'New Direct Lodgement Registration',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-11-20 14:21'),
        title: 'Complex appeal – requires further guidance',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-11-20 14:27'),
        title: 'Interlocutory referral to DJ DeVere',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-12-05 09:10'),
        title: 'Appeal marked as compliant',
        by: 'DJ DeVere'
      },

      {
        id: uuid(),
        date: moment('2018-01-25 16:48'),
        title: 'Response submitted',
        by: 'DWP Appeals Officer'
      }
    ],
  },

  {
    id: 'BV18D00150',
    typeId: types.divorce.id,
    parties: [
      {
        type: 'Petitioner',
        firstName: 'David',
        lastName: 'Francis',
        representative: {
          name: 'Clive Walters',
          role: 'Solicitor',
          company: 'Chadwick and Walters'
        }
      },
      {
        type: 'Respondent',
        firstName: 'Susan',
        lastName: 'Francis',
        representative: {
          name: 'David Jones',
          role: 'Solicitor',
          company: 'Chadwick and Walters'
        }
      }
    ],
    status: '<a href="#">Decree nisi application</a>',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: [{
      id: 'key-facts',
      label: 'Key facts'
    }, {
      id: 'decree-nisi-application',
      label: 'Application for decree nisi'
    }],
    lastAction: moment('2018-05-09'),
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Petitioner (D. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'Respondent (S. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 14:10'),
        title: 'Application for divorce submitted',
        by: 'Petitioner (D . Francis)'
      }
    ]
  },

  {
    id: 'BV18D00153',
    typeId: types.divorce.id,
    linkedCases: [{
      type: 'Financial remedy',
      id: 'FR1231612322'
    }],
    parties: [
      {
        type: 'Petitioner',
        firstName: 'John',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Jane',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    status: '<a href="#">Decree nisi application</a>',
    summaryStatus: '<a href="/app/cases/BV18D00153/documents/d84">Application for decree nisi received</a>',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: [{
      id: 'd8',
      label: 'D8'
    }, {
      id: 'd84',
      label: 'D84'
    }],
    lastAction: moment('2018-05-09'),
    petitioner: '',
    respondent: '',
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Petitioner (D. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'Respondent (S. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 14:10'),
        title: 'Application for divorce submitted',
        by: 'Petitioner (D . Francis)'
      }
    ]
  },


  {
    id: 'BV18D00156',
    typeId: types.divorce.id,
    
    linkedCases: [{
      type: 'Financial remedy',
      id: 'FR1231612322'
    }],

    petitioner: [{
      fullname: 'Margaret Ann Richardson',
      dateOfBirth: moment('1981-06-07'),
      address: '24 Park Road<br>Lewisham<br>London<br>E11 4PR',
      phone: '07787 557 967',
      email: 'margaret.richardson@gmail.com',
      representative: ''
    }],

    respondent: [{
      fullname: 'William Robert Richardson',
      dateOfBirth: moment('1979-04-16'),
      address: '89 London Road<br>Hinckley<br>London<br>LE10 1HH',
      phone: '07700 900 772',
      email: 'william.richardson@gmail.com',
      representative: ''
    }],

    parties: [
      {
        type: 'Petitioner',
        firstName: 'Margaret',
        middleName: 'Ann',
        lastName: 'Richardson',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'William',
        middleName: 'Robert',
        lastName: 'Richardson',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],

    status: '<a href="/app/cases/BV18D00156/documents/d84">Decree nisi application</a>',
    summaryStatus: '<a href="/app/cases/BV18D00156/documents/d84">Application for decree nisi received</a>',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: [{
      id: 'd84',
      label: 'Application for decree nisi (D84)'
    },
    {
      id: 'd8',
      label: 'Application for divorce (D8)'
    }],
    lastAction: moment('2018-05-09'),
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Petitioner (M. Richardson)'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'Respondent (W. Richardson)'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 14:10'),
        title: 'Application for divorce submitted',
        by: 'Petitioner (M. Richardson)'
      }
    ]
  }

];