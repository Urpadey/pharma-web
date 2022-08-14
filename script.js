'use strict';
// Monogdb
import Test from './database/Test';
import mongoose from 'mongoose';
// connecting to local mongodb://
mongoose.connect(
  'mongodb://localhost/fnphdb',
  () => {
    console.log('connected');
  },
  (e) => console.error(e.message)
);
// query selectors
// main_user_image
const mainUser = document.querySelector('.main_user-image');
// backdrop
const backDrop = document.querySelector('.backdrop');
//user Biodata
const userBiodata = document.querySelector('.main_user_biodata ');
// total sum
const sumTotal = document.querySelector('.total_amount');
// continue button
const continueBtn = document.querySelector('.continue_button');
// clear_patient_data button
const clearBtn = document.querySelector('.clear_patient_data');
//
const errorNotify = document.querySelector('.error__message');
const errorMessage = document.querySelector('.__error');
// Drug Name
const drugNames = document.querySelectorAll('.main_drug');
// Drug Qty
const drugQuantities = document.querySelectorAll('.main_drug_quantity');
// Drug Amount
const drugAmounts = document.querySelectorAll('.drug__total_amount');
// Drug item on the list
const drugItems = document.querySelectorAll('.main_drug__item');
/////////////////////
const drugSearch = document.querySelector('.search__bar_input');
const deleteButton = document.querySelector('.delete_patient');
/////////////////////////////////////////////////////
// patient
const patientBiodata = document.querySelector('.biodata__user');
const patientSearch = document.querySelector('.patient__search');
const drugDatabase = [
  {
    name: 'altadone',
    strength: '3mg',
    price: 75,
    quantity: 200,
    manufacturer: '',
    'batch no': '1597XH',
    'expiry date': new Date('2025-03'),
  },
  {
    name: 'altadone',
    strength: '2mg',
    price: 60,
    quantity: 200,
    manufacturer: '',
    'batch no': '1287PH',
    'expiry date': new Date('2024-04'),
  },
  {
    name: 'risperdal',
    strength: '2mg',
    price: 230,
    quantity: 200,
    manufacturer: 'jansen',
    'batch no': '1237GH',
    'expiry date': new Date('2023-03'),
  },
  {
    name: 'risperdal',
    strength: '3mg',
    price: 343,
    quantity: 200,
    manufacturer: 'jansen',
    'batch no': '1597GH',
    'expiry date': new Date('2024-03'),
  },
];
const dataBase = {
  med_info: [
    {
      date: new Date().toDateString('en-US'),
      drugs: [],
    },
  ],
};
/////////////////////////////////////
////////////////////////////////////////////
const searchDrug = () => {
  const drugRender = [];
  //////////////////////////////////////
  drugDatabase?.forEach((el, _) => {
    if (el.name.includes(drugSearch?.value.toLowerCase())) {
      drugRender.push(el);
    }
  });
  console.log(drugRender);
  /////////////////////////////////////
};
// functions
const showPatient = () => {
  // check if the querySelector is available using ?
  //   adding the backdrop and the Userbiodata
  backDrop?.classList.add('show');
  userBiodata?.classList.add('show');
};
const deletePatient = () => {
  // add show to patient__search
  patientSearch.id = 'patient_show';
  // remove show biodata User
  patientBiodata.id = 'noshow';
};
const closePatient = () => {
  // check if querySelector is available using ?.
  //   closing the backdrop and userBiodata
  if (
    backDrop?.classList.contains('show') &&
    userBiodata?.classList.contains('show')
  ) {
    backDrop.classList.remove('show');
    userBiodata.classList.remove('show');
  }
};

const saveDrug = () => {
  //   getting the data
  drugItems.forEach((_, i) => {
    const drugQuantity = drugQuantities[i];
    const drugName = drugNames[i].textContent.trim().replace('\n', '');
    const drugAmount = +drugAmounts[i].textContent;
    // data format
    const drugData = {
      'Drug Name': drugName,
      'Drug Quantity': +drugQuantity.value,
      'Drug Amount': drugAmount,
    };
    save();
    async function save() {
      try {
        let test = await Test.where('saleDate').exists;
        if (test) {
          test.medication.push({
            name: drugName,
            quantity: +drugQuantity.value,
            amount: +drugAmount,
          });
        } else {
          test = await Test.create({
            salesDate: Date.now().toDateString('en-US'),
          });
          test.medication.push({
            name: drugName,
            quantity: +drugQuantity.value,
            amount: +drugAmount,
          });
        }
        await test.save();
        console.log(test);
      } catch (e) {
        console.log(e.message);
      }
    }
  });

  console.log(dataBase);
};
//////////////////////////////////////////////////////////////////////////////////
// sales functionality

drugItems?.forEach((el, _) => {
  const drugName = el.querySelector(':scope > .main_drug h5');
  const drugPrice = el.querySelector(':scope > .main_drug_price h5');
  const drugQuantity = el.querySelector(':scope > .main_drug_quantity');
  let drugTotal = el.querySelector(':scope > .drug__total_amount h5');
  const showQty = (e) => {
    e.preventDefault();
    if (+drugQuantity?.value < 1) {
      // adding the red background
      el.id = 'wrong_input';
      // disabling the continue button
      continueBtn.disabled = true;
      // display error message here
      errorNotify?.classList.add('show');
      errorMessage.textContent = `${drugName.textContent} quantity can be less than one `;
    } else {
      if (el.id) {
        // removing the red background
        el.removeAttribute('id');
        // enabling the continue button
        continueBtn.disabled = false;
        //
        // remove error message if
        if (errorNotify?.classList.contains('show')) {
          errorNotify.classList.remove('show');
        }
      }
      if (drugTotal) {
        drugTotal.textContent = +drugQuantity?.value * +drugPrice?.textContent;
        const drugItemTotal = document.querySelectorAll('.drug__total_amount');
        let sum = 0;
        drugItemTotal.forEach(function (el) {
          sum += +el.textContent;
        });
        sumTotal.textContent = sum;
      }
    }
  };
  drugQuantity?.addEventListener('change', showQty);
});

// backdrop for save sales of drugs in the cancel and continue buttons

// add Eventlistener
// show the patient biodata
mainUser.addEventListener('click', showPatient);
// closing the patient biodata
backDrop.addEventListener('click', closePatient);
// continue button event
continueBtn?.addEventListener('click', saveDrug);
// clear_patient_data event
clearBtn?.addEventListener('click', closePatient);
drugSearch.addEventListener('keydown', searchDrug);
// delete patient
deleteButton.addEventListener('click', deletePatient);
