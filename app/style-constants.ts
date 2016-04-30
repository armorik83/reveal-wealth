export const colors = {
  navBackground         : '#272A2F',
  contentsBackground    : '#F3F4F6',
  moneyTransactions     : '#DD4132',
  moneyTransactionDetail: '#DD4132',
  importData            : '#79C753'
};

const sizeNums = {
  navWidth: 20
};
export const sizes = {
  navWidth     : `${sizeNums.navWidth}vw`,
  contentsWidth: `${100 - sizeNums.navWidth}vw`,
};

export const includes = {
  contentsBorderLeft: (color: string) => `
    border-left: ${color} 8px solid
  `
};