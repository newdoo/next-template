const _baseBit = 100; // 1 bit
const _edge = 0.99; // House Edge
const _minTopCashOut = 1.98;
const _topPercentShare = 0.6;
const _middlePercentShare = 0.4;

// DEFAULT 100 bit, 환수율 1.98% 적용

const fNumGrade = (max) => {

  return (max === 3 || max === 4) ? 
  (
    topCnt = 1,
    middleCnt = (max === 4) ? 2 : 1,
    bottomCnt = 1,

    { top : topCnt, middle : middleCnt, bottom : bottomCnt } 
  )
  :
  ( 
    tmpMax = (max % 5 === 0) ? max : max - (max % 5),

    topCnt = Math.floor(tmpMax * 0.2), // TOP의 인원수는 20%
    bottomCnt = Math.floor(tmpMax * 0.4), // BOTTOM의 인원수는 40%
    middleCnt = max - topCnt - bottomCnt, // MIDDLE의 인원수는 (전체-TOP-BOTTOM)

    { top : topCnt, middle : middleCnt, bottom : bottomCnt } 
  )

}

const fGrade = (ranking, max) => {
  const top = fNumGrade(max).top;

  if(ranking <= top) return 'top';
  if(ranking <= top + fNumGrade(max).middle) return 'middle';
  return 'bottom';
}

const fWeight = (ranking, max) => {

  const grade = fGrade(ranking, max);

  if(grade === 'bottom') return 0; // BOTTOM의 가중치는 0이다.(FOLD)
  const top = fNumGrade(max).top;

  if(grade === 'top') // 4:1.25 TOP 공식 적용
    return ranking === 1 ? fWeight(2, max) * 4 : top - ranking > 0 ? Math.floor( (fWeight(ranking+1,max)*1.25) ) : 4;

  const middle = fNumGrade(max).middle + top;
  return middle - (ranking - top - 1);
}

function getCashOut(max, ranking) {

  let cashoutArray = new Array();
  
  // 배당금 설정
  let money = max * _baseBit * _edge;

  // console.log('money : ' + money);

  // Step 1. TOP & MIDDLE & BOTTOM 인원수 구하기.
  const numGrade = fNumGrade(max);
  let topCnt = numGrade.top;
  let middleCnt = numGrade.middle;
  let bottomCnt = numGrade.bottom;

  // console.log('topCnt : ' + topCnt); // TOP 인원수
  // console.log('bottomCnt : ' + middleCnt); // MIDDLE 인원수
  // console.log('middleCnt : ' + bottomCnt); // BOTTOM 인원수 

  // Step 2. Type 설정
  let type = fGrade(ranking, max);

  // console.log('type : ' + type); // type 결정

  // Step 3. 가중치 구하기
  // const weight = fWeight(ranking, max);

  // console.log('weight : ' + weight); // weight 결정

  // Step 3. TOP & MIDDLE & BOTTOM 랭킹 범위 구하기.
  let topRankArray = new Array();
  let middleRankArray = new Array();
  let bottomRankArray = new Array();

  for(var i=0;i<topCnt;++i) {
    topRankArray.push(i+1);
  }

  for(var j=topCnt;j<topCnt+middleCnt;++j) {
    middleRankArray.push(j+1);
  }

  for(var k=topCnt+middleCnt;k<topCnt+middleCnt+bottomCnt;++k) {
    bottomRankArray.push(k+1);
  }

  // console.log('topRankArray : ' + topRankArray); // TOP 랭킹 범위
  // console.log('middleRankArray : ' + middleRankArray); // BOTTOM 랭킹 범위
  // console.log('bottomRankArray : ' + bottomRankArray); // MIDDLE 랭킹 범위

  // Step 4. 가중치 테이블 만들기
  let topWeightArray = new Array();
  let middleWeightArray = new Array();
  let topWeightSum = 0;
  let middleWeightSum = 0;

  for(var i=0;i<topRankArray.length;++i) {
    topWeightArray.push(fWeight(topRankArray[i], max));
  }
  
  for(var j=0;j<middleRankArray.length;++j) {
    middleWeightArray.push(fWeight(middleRankArray[j], max));
  }

  // 가중치 합산 구하기
  for(var i=0;i<topWeightArray.length;++i) {
    topWeightSum += topWeightArray[i];
  }

  for(var i=0;i<middleWeightArray.length;++i) {
    middleWeightSum += middleWeightArray[i];
  }

  // console.log('topWeightSum : ' + topWeightSum); // TOP 가중치 합산
  // console.log('topWeightArray : ' + topWeightArray); // TOP 가중치 범위

  // console.log('middleWeightSum : ' + middleWeightSum); // TOP 가중치 합산
  // console.log('middleWeightArray : ' + middleWeightArray); // MIDDLE 가중치 범위
  
  // Step 5. 배당금 테이블 만들기
  topCashOutArray = new Array();
  middleCashOutArray = new Array();

  if(max === 3) {
    cashoutArray.push(2);
    cashoutArray.push(0.97);
    cashoutArray.push(0);
  } else if(max === 4) {
    cashoutArray.push(2.26);
    cashoutArray.push(1.1);
    cashoutArray.push(0.6);
    cashoutArray.push(0);
  } else { // 공식 적용
    
    // TOP Cash Out (최소 배당 minTopCashOut)
    for(var i=0;i<topWeightArray.length;++i) {
      let tmpCashout = Math.floor( ( _minTopCashOut + (( (money/100)*_topPercentShare-(_minTopCashOut*topCnt) ) * topWeightArray[i]/topWeightSum ) ) * 100 ) / 100;
      console.log(tmpCashout);
      topCashOutArray.push( Number(tmpCashout.toFixed(2)) );
    }
  
    // MIDDLE Cash Out
    for(var i=0;i<middleWeightArray.length;++i) {
      let tmpCashout = Math.floor( ( ( money/100 ) * _middlePercentShare * middleWeightArray[i]/middleWeightSum ) * 100 ) / 100;
      console.log(tmpCashout);
      middleCashOutArray.push( Number(tmpCashout.toFixed(2)) );
    }

    // 오차(소수점 둘째자리 버림)에 대해 TOP1에 적용
    let bonusCashOut = 0;
    let tmpBonusCashOut = 0;
    for(var i=0;i<topCashOutArray.length;++i) {
      tmpBonusCashOut += Number(topCashOutArray[i]);
    }
    for(var i=0;i<middleCashOutArray.length;++i) {
      tmpBonusCashOut += Number(middleCashOutArray[i]);
    }

    // console.log(tmpBonusCashOut);

    bonusCashOut = ((money/100) - tmpBonusCashOut).toFixed(2);

    topCashOutArray[0] += Number(bonusCashOut);

    // console.log(bonusCashOut);

    // console.log('topCashOutArray : ' + topCashOutArray); // TOP CashOut
    // console.log('middleCashOutArray : ' + middleCashOutArray); // MIDDLE CashOut

    for(var i=0;i<topCashOutArray.length;++i) {
      cashoutArray.push(topCashOutArray[i]);
    }
    for(var i=0;i<middleCashOutArray.length;++i) {
      cashoutArray.push(middleCashOutArray[i]);
    }
    for(var i=0;i<bottomCnt;++i) {
      cashoutArray.push(0);
    }
  }

  // console.log('max : ' + max); // max
  // console.log('ranking : ' + ranking); // ranking
  // console.log('type : ' + type); // type
  // console.log('cashoutArray : ' + cashoutArray); // cashoutArray
  // console.log('cashout : ' + cashoutArray[ranking-1]); // cashout
  // console.log('profit : ' + 100 * cashoutArray[ranking-1]); // profit

  return {
    ranking : ranking,
    type : type,
    cashout: cashoutArray[ranking-1],
    profit: 100 * cashoutArray[ranking-1],
  };
}

module.exports = {getCashOut}