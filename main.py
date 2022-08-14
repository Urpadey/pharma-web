# data = [

#     {
#         name: 'Anderson Spongeboob',
#         patientId: 'USE124', // auto generated
#         med_info: [
#             {
#                 date: 'todays_date',
#                 drugs: [
#                     {
#                         'drug name': 'Zepidone',
#                         'drug strength': '2mg',
#                         ' drug quantity': 40,
#                         ' drug amount': 108 * 40,
#                     },
#                     {
#                         'drug name': 'Artemether Lumenfantrine',
#                         'drug strength': '80/480mg',
#                         'drug quantity': 1,
#                         'drug amount': 1 * 800,
#                     },
#                 ],
#                 'drug total': 23450,
#                 'drug receipt': ' 001234',
#             },
#             {
#                 date: 'next_date',
#                 drugs: [
#                     {
#                         'drug name': '',
#                     },
#                 ],
#             },
#         ],
#     },
# ]

# drugItems?.forEach((el, _) => {
#   const drugPrice = el.querySelector(':scope > .main_drug_price').textContent;
#   const drugQuantity = el.querySelector(':scope > .main_drug_quantity');
#   let drugTotal = el.querySelector(':scope > .drug__total_amount h5');
#   const showQty = (e) => {
#     e.preventDefault();
#     if (+drugQuantity.value < 1 || drugQuantity.value === '') {
#       el.id = 'wrong_input';
#     } else {
#       if (el.id) {
#         el.removeAttribute('id');
#       }
#       drugTotal.textContent = +drugQuantity.value * +drugPrice;
#       const drugItemTotal = document.querySelectorAll('.drug__total_amount');
#       let sum = 0;
#       drugItemTotal.forEach(function (el) {
#         sum += +el.textContent;
#       });
#       sumTotal.textContent = sum;
#     }
#   };
#   drugQuantity.addEventListener('change', showQty);
# }
