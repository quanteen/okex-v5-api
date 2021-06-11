import { request } from './utils/request';
export interface AccountGetAccountAndPositionRiskRequest {
  /** Instrument type MARGINSWAPFUTURES OPTION */
  instType?: string;
}

export interface AccountGetAccountAndPositionRiskResponse {
  /** Update time of account information, millisecond format of Unix timestamp, e.g. 1597026383085 */
  ts: string;

  /** Adjusted/Effective equity in USD levelApplicable to Multi-currency margin */
  adjEq: string;

  /** Detailed asset information in all currencies */
  balData: {
    /** Currency */
    ccy: string;

    /** Equity of the currency */
    eq: string;

    /** discount equity of the currency in USD level. It is expected to go online on March 5 */
    disEq: string;
  }[];

  /** Detailed position information in all currencies */
  posData: {
    /** Instrument type */
    instType: string;

    /** Margin modecross isolated */
    mgnMode: string;

    /** Position ID */
    posId: string;

    /** Instrument ID, e.g. BTC-USD-180216 */
    instId: string;

    /** Quantity of positions  contract */
    pos: string;

    /** Position sidelongshortnet (FUTURES/SWAP/OPTION: positive pos means long position and negative pos means short position. MARGIN: posCcy being base currency means long position, posCcy being quote currency means short position.) */
    posSide: string;

    /** Position currency, only applicable to MARGIN positions. */
    posCcy: string;

    /** Currency used for margin */
    ccy: string;

    /** Quantity of positions  coin */
    notionalCcy: string;

    /** Quantity of positions  usd */
    notionalUsd: string;
  }[];
}

/** Get account and position risk
 * Request Example:
 * GET /api/v5/account/account-position-risk
 *
 *
 * Response Example:
 * [
 *   {
 *     "adjEq": "174238.6793649711331679",
 *     "balData": [
 *       {
 *         "ccy": "BTC",
 *         "disEq": "78846.7803721021362242",
 *         "eq": "1.3863533369419636"
 *       },
 *       {
 *         "ccy": "USDT",
 *         "disEq": "73417.2495112863300127",
 *         "eq": "73323.395564963177146"
 *       }
 *     ],
 *     "posData": [
 *       {
 *         "ccy": "USDT",
 *         "instId": "BTC-USDT-210507",
 *         "instType": "FUTURES",
 *         "mgnMode": "cross",
 *         "notionalCcy": "0.98",
 *         "notionalUsd": "55806.8814912",
 *         "pos": "98",
 *         "posCcy": "",
 *         "posId": "310423695953113090",
 *         "posSide": "net"
 *       }
 *     ],
 *     "ts": "1620282889345"
 *   }
 * ]
 */
export const AccountGetAccountAndPositionRisk = (
  params: AccountGetAccountAndPositionRiskRequest
): Promise<AccountGetAccountAndPositionRiskResponse[]> => {
  return request({
    url: '/api/v5/account/account-position-risk',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetBalanceRequest {
  /** Single currency or multiple currencies (no more than 20) separated with comma, e.g. BTC or BTC,ETH. */
  ccy?: string;
}

export interface AccountGetBalanceResponse {
  /** Update time of account information, millisecond format of Unix timestamp, e.g. 1597026383085 */
  uTime: string;

  /** Total equity in USD level */
  totalEq: string;

  /** Isolated margin equity in USD levelApplicable to Single-currency margin and Multi-currency margin */
  isoEq: string;

  /** Adjusted/Effective equity in USD levelApplicable to Multi-currency margin */
  adjEq: string;

  /** Margin frozen for pending orders in USD levelApplicable to Multi-currency margin */
  ordFroz: string;

  /** Initial margin requirement in USD levelApplicable to Multi-currency margin */
  imr: string;

  /** Maintenance margin requirement in USD level Applicable to Multi-currency margin */
  mmr: string;

  /** Margin ratio in USD level Applicable to Multi-currency margin */
  mgnRatio: string;

  /** Quantity of positions usd Applicable to Multi-currency margin */
  notionalUsd: string;

  /** Detailed asset information in all currencies */
  details: {
    /** Currency */
    ccy: string;

    /** Equity of the currency */
    eq: string;

    /** Cash Balance */
    cashBal: string;

    /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
    uTime: string;

    /** Isolated margin equity of the currencyApplicable to Single-currency margin and Multi-currency margin */
    isoEq: string;

    /** Available equity of the currencyApplicable to Single-currency margin and Multi-currency margin */
    availEq: string;

    /** discount equity of the currency in USD level. It is expected to go online on March 5 */
    disEq: string;

    /** Available balance of the currencyApplicable to Simple */
    availBal: string;

    /** Frozen balance of the currency */
    frozenBal: string;

    /** Margin frozen for open orders */
    ordFrozen: string;

    /** Liabilities of the currencyApplicable to Multi-currency margin */
    liab: string;

    /** Unrealized profit and loss of the currencyApplicable to Single-currency margin and Multi-currency margin */
    upl: string;

    /** Liabilities due to Unrealized loss of the currencyApplicable to Multi-currency margin */
    uplLib: string;

    /** Cross Liabilities of the currencyApplicable to Multi-currency margin */
    crossLiab: string;

    /** Isolated Liabilities of the currencyApplicable to Multi-currency margin */
    isoLiab: string;

    /** Margin ratio of the currencyApplicable to Single-currency margin */
    mgnRatio: string;

    /** Interest of the currencyApplicable to Multi-currency margin */
    interest: string;

    /** System's forced repayment() indicatorDivided into 5 levels, from 1 to 5, the smaller the number, the weaker the TWAP intensity. Applicable to Multi-currency margin */
    twap: string;

    /** Max loan of the currencyApplicable to Multi-currency margin */
    maxLoan: string;

    /** Equity usd of the currency */
    eqUsd: string;

    /** Leverage of the currency */
    notionalLever: string;
  }[];
}

/** Get Balance
 * Request Example:
 * Get the balance of all assets in the account
 * GET /api/v5/account/balance
 *
 * Get the balance of BTC and ETH assets in the account
 * GET /api/v5/account/balance?ccy=BTC,ETH
 *
 *
 * Response Example:
 * [
 *   {
 *     "adjEq": "",
 *     "imr": "",
 *     "isoEq": "0",
 *     "mgnRatio": "",
 *     "mmr": "",
 *     "notionalUsd": "",
 *     "ordFroz": "",
 *     "totalEq": "119839.7127045272353964",
 *     "uTime": "1620273482639",
 *     "details": [
 *       {
 *         "availBal": "",
 *         "availEq": "1.8514774483",
 *         "cashBal": "1.8514774483",
 *         "ccy": "BTC",
 *         "crossLiab": "",
 *         "disEq": "105356.343114641819",
 *         "eq": "1.8514774483",
 *         "eqUsd": "45078.3790756226851775",
 *         "frozenBal": "0",
 *         "interest": "",
 *         "isoEq": "0",
 *         "isoLiab": "",
 *         "liab": "",
 *         "maxLoan": "",
 *         "mgnRatio": "",
 *         "notionalLever": "0.0022195262185864",
 *         "ordFrozen": "0",
 *         "twap": "0",
 *         "uTime": "1620273224683",
 *         "upl": "0",
 *         "uplLiab": ""
 *       },
 *       {
 *         "availBal": "",
 *         "availEq": "10690.52977822647",
 *         "cashBal": "10690.52977822647",
 *         "ccy": "USDT",
 *         "crossLiab": "",
 *         "disEq": "10702.5031715780836464",
 *         "eq": "10690.52977822647",
 *         "eqUsd": "45078.3790756226851775",
 *         "frozenBal": "0",
 *         "interest": "",
 *         "isoEq": "0",
 *         "isoLiab": "",
 *         "liab": "",
 *         "maxLoan": "",
 *         "mgnRatio": "",
 *         "notionalLever": "0.0022195262185864",
 *         "ordFrozen": "0",
 *         "twap": "0",
 *         "uTime": "1620273217428",
 *         "upl": "0",
 *         "uplLiab": ""
 *       },
 *       {
 *         "availBal": "",
 *         "availEq": "3819.056988189225",
 *         "cashBal": "3819.056988189225",
 *         "ccy": "USDK",
 *         "crossLiab": "",
 *         "disEq": "3780.86641830733275",
 *         "eq": "3819.056988189225",
 *         "eqUsd": "45078.3790756226851775",
 *         "frozenBal": "0",
 *         "interest": "",
 *         "isoEq": "0",
 *         "isoLiab": "",
 *         "liab": "",
 *         "maxLoan": "",
 *         "mgnRatio": "",
 *         "notionalLever": "0.0022195262185864",
 *         "ordFrozen": "0",
 *         "twap": "0",
 *         "uTime": "1620273209154",
 *         "upl": "0",
 *         "uplLiab": ""
 *       }
 *     ]
 *   }
 * ]
 */
export const AccountGetBalance = (
  params: AccountGetBalanceRequest
): Promise<AccountGetBalanceResponse[]> => {
  return request({
    url: '/api/v5/account/balance',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetPositionsRequest {
  /** Instrument typeMARGINSWAPFUTURESOPTIONinstId will be checked against instType when both parameters are passed, and the position information of the instId will be returned. */
  instType?: string;

  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId?: string;

  /** Single position ID or multiple position IDs (no more than 20) separated with comma */
  posId?: string;
}

export interface AccountGetPositionsResponse {
  /** Instrument type */
  instType: string;

  /** Margin modecross isolated */
  mgnMode: string;

  /** Position ID */
  posId: string;

  /** Position sidelongshortnet (FUTURES/SWAP/OPTION: positive pos means long position and negative pos means short position. MARGIN: posCcy being base currency means long position, posCcy being quote currency means short position.) */
  posSide: string;

  /** Quantity of positions */
  pos: string;

  /** Position currency, only applicable to MARGIN positions. */
  posCcy: string;

  /** Position that can be closed Only applicable to MARGIN, FUTURES/SWAP in the long-short mode, OPTION in Simple and isolated OPTION in margin Account. */
  availPos: string;

  /** Average open price */
  avgPx: string;

  /** Unrealized profit and loss */
  upl: string;

  /** Unrealized profit and loss ratio */
  uplRatio: string;

  /** Instrument ID, e.g. BTC-USD-180216 */
  instId: string;

  /** Leverage, not applicable to OPTION seller */
  lever: string;

  /** Estimated liquidation priceNot applicable to cross FUTURES/SWAP in Multi-currency margin Not applicable to OPTION */
  liqPx: string;

  /** Initial margin requirement, only applicable to cross. */
  imr: string;

  /** Margin, can be added or reduced. Only applicable to isolated Margin. */
  margin: string;

  /** Margin ratio */
  mgnRatio: string;

  /** Maintenance margin requirement */
  mmr: string;

  /** Liabilities, only applicable to MARGIN. */
  liab: string;

  /** Liabilities currency, only applicable to MARGIN. */
  liabCcy: string;

  /** Interest. Interest that has been incurred. */
  interest: string;

  /** Last trade ID */
  tradeId: string;

  /** Option Value, only applicable to OPTION. */
  optVal: string;

  /** Auto-deleveraging (ADL) indicatorDivided into 5 levels, from 1 to 5, the smaller the number, the weaker the adl intensity. */
  adl: string;

  /** Currency used for margin */
  ccy: string;

  /** Latest traded price */
  last: {
    /** delta：Black-Scholes Greeks in dollars,only applicable to OPTION */
    deltaBS: string;

    /** delta：Greeks in coins,only applicable to OPTION */
    deltaPA: string;

    /** gamma：Black-Scholes Greeks in dollars,only applicable to OPTION */
    gammaBS: string;

    /** gamma：Greeks in coins,only applicable to OPTION */
    gammaPA: string;

    /** theta：Black-Scholes Greeks in dollars,only applicable to OPTION */
    thetaBS: string;

    /** theta：Greeks in coins,only applicable to OPTION */
    thetaPA: string;

    /** vega：Black-Scholes Greeks in dollars,only applicable to OPTION ` */
    vegaBS: string;

    /** vega：Greeks in coins,only applicable to OPTION */
    vegaPA: string;
  }[];

  /** Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;

  /** Latest time position was adjusted, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  uTime: string;
}

/** Get Positions
 * Request Example:
 * Query BTC-USDT position information
 * GET /api/v5/account/positions?instId=BTC-USDT
 *
 *
 * Response Example:
 * [
 *   {
 *     "adl": "1",
 *     "availPos": "1",
 *     "avgPx": "2566.31",
 *     "cTime": "1619507758793",
 *     "ccy": "ETH",
 *     "deltaBS": "",
 *     "deltaPA": "",
 *     "gammaBS": "",
 *     "gammaPA": "",
 *     "imr": "",
 *     "instId": "ETH-USD-210430",
 *     "instType": "FUTURES",
 *     "interest": "0",
 *     "last": "2566.22",
 *     "lever": "10",
 *     "liab": "",
 *     "liabCcy": "",
 *     "liqPx": "2352.8496681818233",
 *     "margin": "0.0003896645377994",
 *     "mgnMode": "isolated",
 *     "mgnRatio": "11.731726509588816",
 *     "mmr": "0.0000311811092368",
 *     "optVal": "",
 *     "pTime": "1619507761462",
 *     "pos": "1",
 *     "posCcy": "",
 *     "posId": "307173036051017730",
 *     "posSide": "long",
 *     "thetaBS": "",
 *     "thetaPA": "",
 *     "tradeId": "109844",
 *     "uTime": "1619507761462",
 *     "upl": "-0.0000009932766034",
 *     "uplRatio": "-0.0025490556801078",
 *     "vegaBS": "",
 *     "vegaPA": ""
 *   }
 * ]
 */
export const AccountGetPositions = (
  params: AccountGetPositionsRequest
): Promise<AccountGetPositionsResponse[]> => {
  return request({
    url: '/api/v5/account/positions',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetBillsDetailsLast7DaysRequest {
  /** Instrument typeSPOT MARGINSWAPFUTURES OPTION */
  instType?: string;

  /** Currency */
  ccy?: string;

  /** Margin modeisolatedcross */
  mgnMode?: string;

  /** Contract typelinearinverseOnly applicable to FUTURES/SWAP */
  ctType?: string;

  /** Bill type1: Transfer 2: Trade 3: Delivery 4: Auto token conversion 5: Liquidation 6: Margin transfer 7: Interest deduction 8: Funding rate 9: ADL 10: Clawback 11: System token conversion */
  type?: string;

  /** Bill subtype1: Buy 2: Sell 3: Open long 4: Open short 5: Close long 6: Close short 9: Interest deduction 11: Transfer in 12: Transfer out 160: Manual margin increase 161: Manual margin decrease 162: Auto margin increase 110: Auto buy 111: Auto sell 118: System token conversion transfer in 119: System token conversion transfer out 100: Partial liquidation close long 101: Partial liquidation close short 102: Partial liquidation buy 103: Partial liquidation sell 104: Liquidation long 105: Liquidation short 106: Liquidation buy 107: Liquidation sell 110: Liquidation transfer in 111: Liquidation transfer out 125: ADL close long 126: ADL close short 127: ADL buy 128: ADL sell 170: Exercised 171: Counterparty exercised 172: Expired OTM 112: Delivery long 113: Delivery short 117: Delivery/Exercise clawback 173: Funding fee expense 174: Funding fee income */
  subType?: string;

  /** Pagination of data to return records earlier than the requested bill ID. */
  after?: string;

  /** Pagination of data to return records newer than the requested bill ID. */
  before?: string;

  /** Number of results per request. The maximum is 100. The default is 100. */
  limit?: string;
}

export interface AccountGetBillsDetailsLast7DaysResponse {
  /** Instrument type */
  instType: string;

  /** Bill ID */
  billId: string;

  /** Bill type */
  type: string;

  /** Bill subtype */
  subType: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g.1597026383085 */
  ts: string;

  /** Change in balance amount at the account level */
  balChg: string;

  /** Change in balance amount at the position level */
  posBalChg: string;

  /** Balance at the account level */
  bal: string;

  /** Balance at the position level */
  posBal: string;

  /** Quantity */
  sz: string;

  /** Account balance currency */
  ccy: string;

  /** Profit and loss */
  pnl: string;

  /** FeeNegative number represents the user transaction fee charged by the platform. Positive number represents rebate. */
  fee: string;

  /** Margin modeisolated crossWhen bills are not generated by position changes, the field returns "" */
  mgnMode: string;

  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Order IDWhen bill type is not trade, the field returns "" */
  ordId: string;

  /** The remitting account1: SPOT  3: FUTURES 5: MARGIN  6: FUNDING   9: SWAP 12: OPTION 18: Unified accountWhen bill type is not transfer, the field returns "". */
  from: string;

  /** The beneficiary account1: SPOT  3: FUTURES 5: MARGIN  6: FUNDING   9: SWAP 12: OPTION 18: Unified accountWhen bill type is not transfer, the field returns "". */
  to: string;

  /** NotesWhen bill type is not transfer, the field returns "". */
  notes: string;
}

/** Get Bills Details (last 7 days)
 * Request Example:
 * GET /api/v5/account/bills
 *
 * GET /api/v5/account/bills?instType=MARGIN
 *
 *
 * Response Example:
 * [
 *   {
 *     "bal": "0.0000819307998198",
 *     "balChg": "-664.2679586599999802",
 *     "billId": "310394313544966151",
 *     "ccy": "USDT",
 *     "fee": "0",
 *     "from": "",
 *     "instId": "LTC-USDT",
 *     "instType": "SPOT",
 *     "mgnMode": "cross",
 *     "notes": "",
 *     "ordId": "310394313519800320",
 *     "pnl": "0",
 *     "posBal": "0",
 *     "posBalChg": "0",
 *     "subType": "2",
 *     "sz": "664.26795866",
 *     "to": "",
 *     "ts": "1620275771196",
 *     "type": "2"
 *   }
 * ]
 */
export const AccountGetBillsDetailsLast7Days = (
  params: AccountGetBillsDetailsLast7DaysRequest
): Promise<AccountGetBillsDetailsLast7DaysResponse[]> => {
  return request({
    url: '/api/v5/account/bills',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetBillsDetailsLast3MonthsRequest {
  /** Instrument typeSPOT MARGINSWAPFUTURES OPTION */
  instType?: string;

  /** Currency */
  ccy?: string;

  /** Margin modeisolatedcross */
  mgnMode?: string;

  /** Contract typelinearinverseOnly applicable to FUTURES/SWAP */
  ctType?: string;

  /** Bill type1: Transfer 2: Trade 3: Delivery 4: Auto token conversion 5: Liquidation 6: Margin transfer 7: Interest deduction 8: Funding rate 9: ADL 10: Clawback 11: System token conversion */
  type?: string;

  /** Bill subtype1: Buy 2: Sell 3: Open long 4: Open short 5: Close long 6: Close short 9: Interest deduction 11: Transfer in 12: Transfer out 160: Manual margin increase 161: Manual margin decrease 162: Auto margin increase 110: Auto buy 111: Auto sell 118: System token conversion transfer in 119: System token conversion transfer out 100: Partial liquidation close long 101: Partial liquidation close short 102: Partial liquidation buy 103: Partial liquidation sell 104: Liquidation long 105: Liquidation short 106: Liquidation buy 107: Liquidation sell 110: Liquidation transfer in 111: Liquidation transfer out 125: ADL close long 126: ADL close short 127: ADL buy 128: ADL sell 170: Exercised 171: Counterparty exercised 172: Expired OTM 112: Delivery long 113: Delivery short 117: Delivery/Exercise clawback 173: Funding fee expense 174: Funding fee income */
  subType?: string;

  /** Pagination of data to return records earlier than the requested bill ID. */
  after?: string;

  /** Pagination of data to return records newer than the requested bill ID. */
  before?: string;

  /** Number of results per request. The maximum is 100. The default is 100. */
  limit?: string;
}

export interface AccountGetBillsDetailsLast3MonthsResponse {
  /** Instrument type */
  instType: string;

  /** Bill ID */
  billId: string;

  /** Bill type */
  type: string;

  /** Bill subtype */
  subType: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g.1597026383085 */
  ts: string;

  /** Change in balance amount at the account level */
  balChg: string;

  /** Change in balance amount at the position level */
  posBalChg: string;

  /** Balance at the account level */
  bal: string;

  /** The number */
  sz: string;

  /** Account balance currency */
  ccy: string;

  /** Profit and loss */
  pnl: string;

  /** FeeNegative number represents the user transaction fee charged by the platform. Positive number represents rebate. */
  fee: string;

  /** Margin modeisolated crossWhen bills are not generated by position changes, the field returns "" */
  mgnMode: string;

  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Order IDWhen bill type is not trade, the field returns "" */
  ordId: string;

  /** The remitting account1: SPOT  3: FUTURES 5: MARGIN  6: FUNDING   9: SWAP 12: OPTION 18: Unified accountWhen bill type is not transfer, the field returns "". */
  from: string;

  /** The beneficiary account1: SPOT  3: FUTURES 5: MARGIN  6: FUNDING   9: SWAP 12: OPTION 18: Unified accountWhen bill type is not transfer, the field returns "". */
  to: string;

  /** NotesWhen bill type is not transfer, the field returns "". */
  notes: string;
}

/** Get Bills Details (last 3 months)
 * Request Example:
 * GET /api/v5/account/bills-archive
 *
 * GET /api/v5/account/bills-archive?instType=MARGIN
 *
 *
 * Response Example:
 * [
 *   {
 *     "bal": "0.0000819307998198",
 *     "balChg": "-664.2679586599999802",
 *     "billId": "310394313544966151",
 *     "ccy": "USDT",
 *     "fee": "0",
 *     "from": "",
 *     "instId": "LTC-USDT",
 *     "instType": "SPOT",
 *     "mgnMode": "cross",
 *     "notes": "",
 *     "ordId": "310394313519800320",
 *     "pnl": "0",
 *     "posBal": "0",
 *     "posBalChg": "0",
 *     "subType": "2",
 *     "sz": "664.26795866",
 *     "to": "",
 *     "ts": "1620275771196",
 *     "type": "2"
 *   }
 * ]
 */
export const AccountGetBillsDetailsLast3Months = (
  params: AccountGetBillsDetailsLast3MonthsRequest
): Promise<AccountGetBillsDetailsLast3MonthsResponse[]> => {
  return request({
    url: '/api/v5/account/bills-archive',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetAccountConfigurationResponse {
  /** Account ID */
  uid: string;

  /** Account level 1: Simple 2: Single-currency margin 3: Multi-currency margin */
  acctLv: string;

  /** Position modelong_short_mode: long/short, only applicable to FUTURES/SWAP net_mode: net */
  posMode: string;

  /** Whether to borrow coins automaticallytrue: borrow coins automatically false: not borrow coins automatically */
  autoLoan: boolean;

  /** Current display type of GreeksPA: Greeks in coins BS: Black-Scholes Greeks in dollars */
  greeksType: string;

  /** The user level of the current real trading volume on the platform,  e.g lv1 */
  level: string;

  /** Temporary experience user level of special users, e.g lv3 */
  levelTmp: string;
}

/** Get Account Configuration
 * Request Example:
 * GET /api/v5/account/config
 *
 *
 * Response Example:
 * [
 *   {
 *     "uid": "43812",
 *     "acctLv": "2",
 *     "posMode": "long_short_mode",
 *     "autoLoan": true,
 *     "level": "lv1",
 *     "levelTmp": "",
 *     "greeksType": "BS"
 *   }
 * ]
 */
export const AccountGetAccountConfiguration = (): Promise<AccountGetAccountConfigurationResponse[]> => {
  return request({
    url: '/api/v5/account/config',
    method: 'GET',

    paramsIn: 'query'
  });
};

export interface AccountSetPositionModeRequest {
  /** Position modelong_short_mode: long/short, only applicable to FUTURES/SWAPnet_mode: net */
  posMode: string;
}

export interface AccountSetPositionModeResponse {
  /** Position mode */
  posMode: string;
}

/** Set Position mode
 * Request Example:
 * POST /api/v5/account/set-position-mode
 * body
 * {
 *     "posMode":"long_short_mode"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "posMode": "long_short_mode"
 *   }
 * ]
 */
export const AccountSetPositionMode = (
  params: AccountSetPositionModeRequest
): Promise<AccountSetPositionModeResponse[]> => {
  return request({
    url: '/api/v5/account/set-position-mode',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface AccountSetLeverageRequest {
  /** Instrument IDEither instId or ccy is required; if both are passed, instId will be used by default. */
  instId?: string;

  /** Currency used for marginOnly applicable to cross MARGIN of Multi-currency margin */
  ccy?: string;

  /** Leverage */
  lever: string;

  /** Margin modeisolated cross Only can be cross if ccy is passed. */
  mgnMode: string;

  /** Position sidelong short net Required in long/short mode and when margin mode is isolated, only long or short can be passed. Only net can be passed in other cases.Only applicable to FUTURES/SWAP */
  posSide?: string;
}

export interface AccountSetLeverageResponse {
  /** Leverage */
  lever: string;

  /** Margin modecross isolated */
  mgnMode: string;

  /** Instrument ID */
  instId: string;

  /** Position side */
  posSide: string;
}

/** Set Leverage
 * Request Example:
 * set leverage for isolated `MARGIN` at pairs level
 * POST /api/v5/account/set-leverage
 * body
 * {
 *     "instId":"BTC-USDT",
 *     "lever":"5",
 *     "mgnMode":"isolated"
 * }
 *
 * set leverage for cross `MARGIN` in Single-currency margin at pairs level
 * POST /api/v5/account/set-leverage
 * body
 * {
 *     "instId":"BTC-USDT",
 *     "lever":"5",
 *     "mgnMode":"cross"
 * }
 *
 * set leverage for cross `MARGIN` in Multi-currency margin at currency level
 * POST /api/v5/account/set-leverage
 * body
 * {
 *     "ccy":"BTC",
 *     "lever":"5",
 *     "mgnMode":"cross"
 * }
 *
 * set leverage on long BTC-USDT-200802 for isolated `FUTURES`
 * POST /api/v5/account/set-leverage
 * body
 * {
 *     "instId":"BTC-USDT-200802",
 *     "lever":"5",
 *     "posSide":"long",
 *     "mgnMode":"isolated"
 * }
 *
 * set leverage for cross `FUTURES/SWAP` at underlying level
 * POST /api/v5/account/set-leverage
 * body
 * {
 *     "instId":"BTC-USDT-200802",
 *     "lever":"5",
 *     "mgnMode":"cross"
 * }
 *
 * Response Example:
 * [
 *   {
 *     "lever": "30",
 *     "mgnMode": "isolated",
 *     "instId": "BTC-USDT-SWAP",
 *     "posSide": "long"
 *   }
 * ]
 */
export const AccountSetLeverage = (
  params: AccountSetLeverageRequest
): Promise<AccountSetLeverageResponse[]> => {
  return request({
    url: '/api/v5/account/set-leverage',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface AccountGetMaximumBuySellAmountOrOpenAmountRequest {
  /** Instrument ID, e.g. BTC-USDT-200802 */
  instId: string;

  /** Trade modecross isolated cash */
  tdMode: string;

  /** Currency used for marginOnly applicable to MARGIN of Single-currency margin. */
  ccy?: string;

  /** PriceWhen the price is not passed, it will be calculated according to the last traded price. */
  px?: string;
}

export interface AccountGetMaximumBuySellAmountOrOpenAmountResponse {
  /** Instrument ID */
  instId: string;

  /** SPOT: The maximum number of coins that you can buyFUTURES/SWAP/OPTIONS: The maximum number of contracts that you can buy */
  maxBuy: string;

  /** SPOT: The maximum number of coins that you can sellFUTURES/SWAP/OPTIONS: The maximum number of contracts that you can sell */
  maxSell: string;
}

/** Get maximum buy/sell amount or open amount
 * Request Example:
 * GET /api/v5/account/max-size?instId=BTC-USDT&mgnMode=isolated
 *
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT-200802",
 *     "maxBuy": "1",
 *     "maxSell": "1"
 *   }
 * ]
 */
export const AccountGetMaximumBuySellAmountOrOpenAmount = (
  params: AccountGetMaximumBuySellAmountOrOpenAmountRequest
): Promise<AccountGetMaximumBuySellAmountOrOpenAmountResponse[]> => {
  return request({
    url: '/api/v5/account/max-size',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetMaximumAvailableTradableAmountRequest {
  /** Instrument ID, e.g. BTC-USDT-200802 */
  instId: string;

  /** Currency used for marginOnly applicable to cross MARGIN of Single-currency margin. */
  ccy?: string;

  /** Trade modecross isolated cash */
  tdMode: string;

  /** Whether to reduce position onlyOnly applicable to MARGIN */
  reduceOnly?: boolean;
}

export interface AccountGetMaximumAvailableTradableAmountResponse {
  /** Instrument ID */
  instId: string;

  /** Amount available to buy */
  availBuy: string;

  /** Amount available to sell */
  availSell: string;
}

/** Get Maximum Available Tradable Amount
 * Request Example:
 * Query maximum available transaction amount when cross MARGIN BTC-USDT use BTC as margin
 * GET /api/v5/account/max-avail-size?instId=BTC-USDT&tdMode=cross&ccy=BTC
 *
 * Query maximum available transaction amount for SPOT BTC-USDT
 * GET /api/v5/account/max-avail-size?instId=BTC-USDT&tdMode=cash
 *
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT-200802",
 *     "availBuy": "1",
 *     "availSell": "1"
 *   }
 * ]
 */
export const AccountGetMaximumAvailableTradableAmount = (
  params: AccountGetMaximumAvailableTradableAmountRequest
): Promise<AccountGetMaximumAvailableTradableAmountResponse[]> => {
  return request({
    url: '/api/v5/account/max-avail-size',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountIncreaseDecreaseMarginRequest {
  /** Instrument ID */
  instId: string;

  /** Position side, the default is netlongshortnet */
  posSide: string;

  /** Typeadd   reduce */
  type: string;

  /** Amount to be increased or decreased. */
  amt: string;
}

export interface AccountIncreaseDecreaseMarginResponse {
  /** Instrument ID */
  instId: string;

  /** Position side, long  short */
  posSide: string;

  /** Amount to be increase or decrease */
  amt: string;

  /** Type */
  type: string;
}

/** Increase/Decrease margin
 * Request Example:
 * POST /api/v5/account/position/margin-balance
 * body
 * {
 *     "instId":"BTC-USDT-200626",
 *     "posSide":"short",
 *     "type":"add",
 *     "amt":"1"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT-200626",
 *     "posSide": "short",
 *     "amt": "1",
 *     "type": "add"
 *   }
 * ]
 */
export const AccountIncreaseDecreaseMargin = (
  params: AccountIncreaseDecreaseMarginRequest
): Promise<AccountIncreaseDecreaseMarginResponse[]> => {
  return request({
    url: '/api/v5/account/position/margin-balance',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface AccountGetLeverageRequest {
  /** Instrument ID */
  instId: string;

  /** Margin modecross isolated */
  mgnMode: string;
}

export interface AccountGetLeverageResponse {
  /** Instrument ID */
  instId: string;

  /** Margin mode */
  mgnMode: string;

  /** Position sidelongshortnetOnly applicable to FUTURES/SWAPIn long/short mode, the leverage in both directions long short will be returned. */
  posSide: string;

  /** Leverage */
  lever: string;
}

/** Get Leverage
 * Request Example:
 * GET /api/v5/account/leverage-info?instId=BTC-USDT-200626&mgnMode=cross
 *
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT-200626",
 *     "mgnMode": "cross",
 *     "posSide": "long",
 *     "lever": "10"
 *   },
 *   {
 *     "instId": "BTC-USDT-200626",
 *     "mgnMode": "cross",
 *     "posSide": "short",
 *     "lever": "10"
 *   }
 * ]
 */
export const AccountGetLeverage = (
  params: AccountGetLeverageRequest
): Promise<AccountGetLeverageResponse[]> => {
  return request({
    url: '/api/v5/account/leverage-info',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetTheMaximumLoanOfInstrumentRequest {
  /** Instrument ID */
  instId: string;

  /** Margin modeisolated cross */
  mgnMode: string;

  /** Margin currencyOnly applicable to cross MARGIN in Single-currency margin */
  mgnCcy?: string;
}

export interface AccountGetTheMaximumLoanOfInstrumentResponse {
  /** Instrument ID */
  instId: string;

  /** Margin mode */
  mgnMode: string;

  /** Margin currency */
  mgnCcy: string;

  /** Max loan */
  maxLoan: string;

  /** Currency */
  ccy: string;

  /** Order sidebuy sell */
  side: string;
}

/** Get the maximum loan of instrument
 * Request Example:
 * Max loan of isolated `MARGIN` in `Single-currency margin`
 * GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=isolated
 *
 * Max loan of cross `MARGIN` in `Single-currency margin` (Margin Currency is BTC)
 * GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=cross&mgnCcy=BTC
 *
 * Max loan of cross `MARGIN` in `Multi-currency margin`
 * GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=cross
 *
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT",
 *     "mgnMode": "isolated",
 *     "mgnCcy": "",
 *     "maxLoan": "0.1",
 *     "ccy": "BTC",
 *     "side": "sell"
 *   },
 *   {
 *     "instId": "BTC-USDT",
 *     "mgnMode": "isolated",
 *     "mgnCcy": "",
 *     "maxLoan": "0.2",
 *     "ccy": "USDT",
 *     "side": "buy"
 *   }
 * ]
 */
export const AccountGetTheMaximumLoanOfInstrument = (
  params: AccountGetTheMaximumLoanOfInstrumentRequest
): Promise<AccountGetTheMaximumLoanOfInstrumentResponse[]> => {
  return request({
    url: '/api/v5/account/max-loan',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetFeeRatesRequest {
  /** Instrument typeSPOTMARGINSWAPFUTURESOPTION */
  instType: string;

  /** Instrument ID, e.g. BTC-USDTonly applicable toFUTURES/SWAP/OPTION */
  instId?: string;

  /** Underlying, e.g. BTC-USDonly applicable toFUTURES/SWAP/OPTION */
  uly?: string;

  /** Fee Schedule1: Tier 12: Tier 2 3: Tier 34: Tier 4 */
  category?: string;
}

export interface AccountGetFeeRatesResponse {
  /** Fee Schedule */
  category: string;

  /** Taker fee rate */
  taker: string;

  /** Maker fee rate */
  maker: string;

  /** Delivery fee rate */
  delivery: string;

  /** Fee rate for exercising the option */
  exercise: string;

  /** Fee rate Level */
  level: string;

  /** Instrument type */
  instType: string;

  /** Data return time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Fee Rates
 * Request Example:
 * Query trade fee rate of SPOT BTC-USDT
 * GET /api/v5/account/trade-fee?instType=SPOT&instId=BTC-USDT
 *
 * Query trade fee rate in Tier 1
 * GET /api/v5/account/trade-fee?instType=SWAP&category=1
 *
 *
 * Response Example:
 * [
 *   {
 *     "category": "1",
 *     "delivery": "",
 *     "exercise": "",
 *     "instType": "SPOT",
 *     "level": "lv1",
 *     "maker": "-0.001",
 *     "taker": "-0.0015",
 *     "ts": "1608623351857"
 *   }
 * ]
 */
export const AccountGetFeeRates = (
  params: AccountGetFeeRatesRequest
): Promise<AccountGetFeeRatesResponse[]> => {
  return request({
    url: '/api/v5/account/trade-fee',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetInterestAccruedRequest {
  /** Instrument ID, e.g. BTC-USDTOnly applicable to MARGIN */
  instId?: string;

  /** Currency, e.g. BTC */
  ccy?: string;

  /** Margin modecross  isolated */
  mgnMode?: string;

  /** Pagination of data to return records earlier than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  after?: string;

  /** Pagination of data to return records newer than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface AccountGetInterestAccruedResponse {
  /** Instrument ID */
  instId: string;

  /** Currency */
  ccy: string;

  /** Margin mode */
  mgnMode: string;

  /** Interest */
  interest: string;

  /** Interest Rate */
  interestRate: string;

  /** Liabilities amount */
  liab: string;

  /** Interest calculation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get interest-accrued
 * Request Example:
 * GET /api/v5/account/interest-accrued
 *
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT",
 *     "ccy": "USDT",
 *     "mgnMode": "cross",
 *     "interestRate": "0.00001",
 *     "liab": "2",
 *     "interest": "0.02",
 *     "ts": "1597026383085"
 *   },
 *   {
 *     "instId": "BTC-USDT",
 *     "ccy": "USDT",
 *     "mgnMode": "cross",
 *     "interestRate": "0.00001",
 *     "liab": "2",
 *     "interest": "0.02",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const AccountGetInterestAccrued = (
  params: AccountGetInterestAccruedRequest
): Promise<AccountGetInterestAccruedResponse[]> => {
  return request({
    url: '/api/v5/account/interest-accrued',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountGetInterestRateRequest {
  /** Single currency or multiple currencies */
  ccy?: string;
}

export interface AccountGetInterestRateResponse {
  /** interest rate */
  interestRate: string;

  /** currency */
  ccy: string;
}

/** Get interest rate
 * Request Example:
 * GET /api/v5/account/interest-rate
 *
 * Response Example:
 * [
 *   {
 *     "ccy": "BTC",
 *     "interestRate": "0.0001"
 *   },
 *   {
 *     "ccy": "LTC",
 *     "interestRate": "0.0003"
 *   }
 * ]
 */
export const AccountGetInterestRate = (
  params: AccountGetInterestRateRequest
): Promise<AccountGetInterestRateResponse[]> => {
  return request({
    url: '/api/v5/account/interest-rate',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface AccountSetGreeksPaBsRequest {
  /** Display  type of Greeks.PA: Greeks in coinsBS: Black-Scholes Greeks in dollars */
  greeksType: string;
}

export interface AccountSetGreeksPaBsResponse {
  /** Display type of Greeks. */
  greeksType: string;
}

/** Set Greeks (PA/BS)
 * Request Example:
 * POST /api/v5/account/set-greeks
 * body
 * {
 *     "greeksType":"PA"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "greeksType": "PA"
 *   }
 * ]
 */
export const AccountSetGreeksPaBs = (
  params: AccountSetGreeksPaBsRequest
): Promise<AccountSetGreeksPaBsResponse[]> => {
  return request({
    url: '/api/v5/account/set-greeks',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface AccountGetMaximumWithdrawalsRequest {
  /** Currency, e.g. BTC */
  ccy?: string;
}

export interface AccountGetMaximumWithdrawalsResponse {
  /** Max withdrawal */
  maxWd: string;

  /** Currency */
  ccy: string;
}

/** Get Maximum Withdrawals
 * Request Example:
 * GET /api/v5/account/max-withdrawal
 *
 *
 * Response Example:
 * [
 *   {
 *     "ccy": "BTC",
 *     "maxWd": "124"
 *   },
 *   {
 *     "ccy": "ETH",
 *     "maxWd": "10"
 *   }
 * ]
 */
export const AccountGetMaximumWithdrawals = (
  params: AccountGetMaximumWithdrawalsRequest
): Promise<AccountGetMaximumWithdrawalsResponse[]> => {
  return request({
    url: '/api/v5/account/max-withdrawal',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface FundingGetDepositAddressRequest {
  /** Currency, e.g. BTC */
  ccy: string;
}

export interface FundingGetDepositAddressResponse {
  /** Deposit address */
  addr: string;

  /** Deposit tag (This will not be returned if the currency does not require a tag for deposit) */
  tag: string;

  /** Deposit memo (This will not be returned if the currency does not require a payment_id for deposit) */
  memo: string;

  /** Deposit payment ID (This will not be returned if the currency does not require a payment_id for deposit) */
  pmtId: string;

  /** Currency, e.g. BTC */
  ccy: string;

  /** The beneficiary account 1: SPOT 3: FUTURES 6: FUNDING 9: SWAP 12: OPTION 18: Unified account */
  to: string;

  /** Return true if current deposit address selected by website page */
  selected: boolean;
}

/** Get Deposit Address
 * Request Example:
 * GET /api/v5/asset/deposit-address?ccy=BTC
 *
 *
 * Response Example:
 * [
 *   {
 *     "ccy": "eos",
 *     "memo": "692237",
 *     "to": "6",
 *     "addr": "okbtothemoon:692237",
 *     "selected": true
 *   }
 * ]
 */
export const FundingGetDepositAddress = (
  params: FundingGetDepositAddressRequest
): Promise<FundingGetDepositAddressResponse[]> => {
  return request({
    url: '/api/v5/asset/deposit-address',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface FundingGetBalanceRequest {
  /** Single currency or multiple currencies (no more than 20) separated with comma, e.g. BTC or BTC,ETH. */
  ccy?: string;
}

export interface FundingGetBalanceResponse {
  /** Currency */
  ccy: string;

  /** Balance */
  bal: string;

  /** Frozen balance */
  frozenBal: string;

  /** Available balance */
  availBal: string;
}

/** Get Balance
 * Request Example:
 * GET /api/v5/asset/balances
 *
 *
 * Response Example:
 * [
 *   {
 *     "availBal": "37.11827078",
 *     "bal": "37.11827078",
 *     "ccy": "ETH",
 *     "frozenBal": "0"
 *   }
 * ]
 */
export const FundingGetBalance = (
  params: FundingGetBalanceRequest
): Promise<FundingGetBalanceResponse[]> => {
  return request({
    url: '/api/v5/asset/balances',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface FundingFundsTransferRequest {
  /** Currency, e.g. USDT */
  ccy: string;

  /** Amount to be transferred */
  amt: string;

  /** Transfer type0: transfer within account1: master account to sub-account2: sub-account to master accountthe default is 0 */
  type?: string;

  /** The remitting account1: SPOT 3: FUTURES 5: MARGIN 6: FUNDING 9: SWAP 12: OPTION 18: Unified account */
  from: string;

  /** The beneficiary account1: SPOT 3: FUTURES 5: MARGIN 6: FUNDING 9: SWAP 12: OPTION 18: Unified account */
  to: string;

  /** Name of the sub-accountWhen type is 1 or 2, sub-account is required. */
  subAcct?: string;

  /** MARGIN trading pair (e.g. BTC-USDT) or contract underlying (e.g. BTC-USD) to be transferred out. */
  instId?: string;

  /** MARGIN trading pair (e.g. BTC-USDT) or contract underlying (e.g. BTC-USD) to be transferred in. */
  toInstId?: string;
}

export interface FundingFundsTransferResponse {
  /** TransferID */
  transId: string;

  /** Currency */
  ccy: string;

  /** The remitting account */
  from: string;

  /** Transfer amount */
  amt: string;

  /** The beneficiary account */
  to: string;
}

/** Funds Transfer
 * Request Example:
 * Transfer 1.5 USDT from funding account to Unified account when current account is master-account
 * POST /api/v5/asset/transfer
 * body
 * {
 *     "ccy":"USDT",
 *     "amt":"1.5",
 *     "from":"6",
 *     "to":"18"
 * }
 *
 * Transfer 1.5 USDT from funding account to subAccount when current account is master-account
 * POST /api/v5/asset/transfer
 * body
 * {
 *     "ccy":"USDT",
 *     "type":"1",
 *     "amt":"1.5",
 *     "from":"6",
 *     "to":"6",
 *     "subAcct":"mini"
 * }
 *
 * Transfer 2 USDT from Unified account to FUTURES account BTC-USDT when current account is master-account
 * POST /api/v5/asset/transfer
 * body
 * {
 *     "ccy":"USDT",
 *     "amt":"2",
 *     "from":"18",
 *     "to":"3",
 *     "toInstId":"BTC-USD"
 * }
 *
 * Transfer 2 USDT from Unified account to SPOT account BTC-USDT when current account is master-account
 * POST /api/v5/asset/transfer
 * body
 * {
 *     "ccy":"USDT",
 *     "amt":"2",
 *     "from":"18",
 *     "to":"5",
 *     "toInstId":"BTC-USDT"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "transId": "754147",
 *     "ccy": "USDT",
 *     "from": "6",
 *     "amt": "0.1",
 *     "to": "18"
 *   }
 * ]
 */
export const FundingFundsTransfer = (
  params: FundingFundsTransferRequest
): Promise<FundingFundsTransferResponse[]> => {
  return request({
    url: '/api/v5/asset/transfer',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface FundingWithdrawalRequest {
  /** Currency, e.g. USDT */
  ccy: string;

  /** Withdrawal amount */
  amt: string;

  /** Withdrawal destination address3: OKEx4: Digital currency address */
  dest: string;

  /** Verified digital currency address, email or mobile number. Some digital currency addresses are formatted as 'address+tag', e.g. 'ARDOR-7JF3-8F2E-QUWZ-CAN7F:123456' */
  toAddr: string;

  /** Trade password */
  pwd: string;

  /** Transaction fee */
  fee: string;
}

export interface FundingWithdrawalResponse {
  /** Currency */
  ccy: string;

  /** Withdrawal amount */
  amt: string;

  /** Withdrawal ID */
  wdId: string;
}

/** Withdrawal
 * Request Example:
 * POST /api/v5/asset/withdrawal
 * body
 * {
 *     "amt":"1",
 *     "fee":"0.0005",
 *     "pwd":"123456",
 *     "dest":"4",
 *     "ccy":"BTC",
 *     "toAddr":"17DKe3kkkkiiiiTvAKKi2vMPbm1Bz3CMKw"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "amt": "0.1",
 *     "wdId": "67485",
 *     "ccy": "BTC"
 *   }
 * ]
 */
export const FundingWithdrawal = (
  params: FundingWithdrawalRequest
): Promise<FundingWithdrawalResponse[]> => {
  return request({
    url: '/api/v5/asset/withdrawal',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface FundingGetDepositHistoryRequest {
  /** Currency, e.g. BTC */
  ccy?: string;

  /** Status of deposit 0: waiting for confirmation  1: deposit credited  2: deposit successful */
  state?: string;

  /** Pagination of data to return records earlier than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  after?: string;

  /** Pagination of data to return records newer than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface FundingGetDepositHistoryResponse {
  /** Currency */
  ccy: string;

  /** Deposit amount */
  amt: string;

  /** Only the internal OKEx account is returned, not the address on the blockchain. */
  from: string;

  /** Deposit address */
  to: string;

  /** Hash record of the deposit */
  txId: string;

  /** Time that the deposit is credited, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;

  /** Status of deposit 0: waiting for confirmation  1: deposit credited  2: deposit successful */
  state: string;

  /** Deposit ID */
  depId: string;
}

/** Get Deposit History
 * Request Example:
 *
 * GET /api/v5/asset/deposit-history
 *
 * Query deposit history from 2018-09-29 to 2018-10-30
 * GET /api/v5/asset/deposit-history?ccy=BTC&after=1597026383085&before=1597026383085
 *
 *
 * Response Example:
 * [
 *   {
 *     "amt": "0.01044408",
 *     "txId": "1915737_3_0_0_asset",
 *     "ccy": "BTC",
 *     "from": "13801825426",
 *     "to": "",
 *     "ts": "1597026383085",
 *     "state": "2",
 *     "depId": "4703879"
 *   },
 *   {
 *     "amt": "491.6784211",
 *     "txId": "1744594_3_184_0_asset",
 *     "ccy": "OKB",
 *     "from": "",
 *     "to": "",
 *     "ts": "1597026383085",
 *     "state": "2",
 *     "depId": "4703809"
 *   },
 *   {
 *     "amt": "223.18782496",
 *     "txId": "6d892c669225b1092c780bf0da0c6f912fc7dc8f6b8cc53b003288624c",
 *     "ccy": "USDT",
 *     "from": "",
 *     "to": "39kK4XvgEuM7rX9frgyHoZkWqx4iKu1spD",
 *     "ts": "1597026383085",
 *     "state": "2",
 *     "depId": "4703779"
 *   }
 * ]
 */
export const FundingGetDepositHistory = (
  params: FundingGetDepositHistoryRequest
): Promise<FundingGetDepositHistoryResponse[]> => {
  return request({
    url: '/api/v5/asset/deposit-history',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface FundingGetWithdrawalHistoryRequest {
  /** Currency, e.g. BTC */
  ccy?: string;

  /** Status of withdrawal -3: pending cancel  -2: canceled  -1: failed 0: pending  1:sending  2: sent 3: awaiting email verification 4: awaiting manual verification  5: awaiting identity verification */
  state?: string;

  /** Pagination of data to return records earlier than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  after?: string;

  /** Pagination of data to return records newer than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface FundingGetWithdrawalHistoryResponse {
  /** Currency */
  ccy: string;

  /** Token amount */
  amt: string;

  /** Time the withdrawal request was submitted, Unix timestamp format in milliseconds, e.g. 1597026383085. */
  ts: string;

  /** Remitting addressUser account ID will be shown for OKEx addresses. */
  from: string;

  /** Receiving address */
  to: string;

  /** Some currencies require a tag for withdrawals. This is not returned if not required. */
  tag: string;

  /** Some currencies require a payment ID for withdrawals. This is not returned if not required. */
  pmtId: string;

  /** Some currencies require this parameter for withdrawals. This is not returned if not required. */
  memo: string;

  /** Hash record of the withdrawal. This parameter will not be returned for internal transfers. */
  txId: string;

  /** Withdrawal fee */
  fee: string;

  /** Status of withdrawal */
  state: string;

  /** Withdrawal ID */
  wdId: string;
}

/** Get Withdrawal History
 * Request Example:
 *
 * GET /api/v5/asset/withdrawal-history
 *
 * Query withdrawal history from 2018-09-29 to 2018-10-30
 * GET /api/v5/asset/withdrawal-history?ccy=BTC&after=1597026383085&before=1597026383085
 *
 *
 * Response Example:
 * [
 *   {
 *     "amt": "0.094",
 *     "wdId": "4703879",
 *     "fee": "0.01000000eth",
 *     "txId": "0x62477bac6509a04512819bb1455e923a60dea5966c7caeaa0b24eb8fb0432b85",
 *     "ccy": "ETH",
 *     "from": "13426335357",
 *     "to": "0xA41446125D0B5b6785f6898c9D67874D763A1519",
 *     "ts": "1597026383085",
 *     "state": "2"
 *   },
 *   {
 *     "amt": "0.01",
 *     "wdId": "4703879",
 *     "fee": "0.00000000btc",
 *     "txId": "",
 *     "ccy": "BTC",
 *     "from": "13426335357",
 *     "to": "13426335357",
 *     "ts": "1597026383085",
 *     "state": "2"
 *   }
 * ]
 */
export const FundingGetWithdrawalHistory = (
  params: FundingGetWithdrawalHistoryRequest
): Promise<FundingGetWithdrawalHistoryResponse[]> => {
  return request({
    url: '/api/v5/asset/withdrawal-history',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface FundingGetCurrenciesResponse {
  /** Currency, e.g. BTC */
  ccy: string;

  /** Currency */
  name: string;

  /** Chain name, e.g. USDT-ERC20, USDT-TRC20, USDT-OMIN */
  chain: string;

  /** Availability to deposit from chain.false: not available  true: available */
  canDep: boolean;

  /** Availability to withdraw to chain.false: not available  true: available */
  canWd: boolean;

  /** Availability to internal transfer.false: not available  true: available */
  canInternal: boolean;

  /** Minimum withdrawal threshold */
  minWd: string;

  /** Minimum withdrawal fee */
  minFee: string;

  /** Maximum withdrawal fee */
  maxFee: string;
}

/** Get Currencies
 * Request Example:
 * GET /api/v5/asset/currencies
 *
 *
 * Response Example:
 * [
 *   {
 *     "ccy": "BTC",
 *     "chain": "",
 *     "name": "",
 *     "canDep": true,
 *     "canWd": true,
 *     "canInternal": true,
 *     "minWd": "0.01",
 *     "maxFee": "0.02",
 *     "minFee": "0.0005"
 *   },
 *   {
 *     "ccy": "USDT",
 *     "chain": "USDT-ERC20",
 *     "name": "",
 *     "canDep": true,
 *     "canWd": true,
 *     "minWd": "0.1",
 *     "maxFee": "0.2",
 *     "minFee": "0.01"
 *   }
 * ]
 */
export const FundingGetCurrencies = (): Promise<FundingGetCurrenciesResponse[]> => {
  return request({
    url: '/api/v5/asset/currencies',
    method: 'GET',

    paramsIn: 'query'
  });
};

export interface FundingPiggybankPurchaseRedemptionRequest {
  /** Currency, e.g. BTC */
  ccy: string;

  /** Purchase/redemption amount */
  amt: string;

  /** Action type.purchase: purchase PiggyBank sharesredempt: redeem PiggyBank shares */
  side: string;
}

export interface FundingPiggybankPurchaseRedemptionResponse {
  /** Currency */
  ccy: string;

  /** Purchase/redemption amount */
  amt: string;

  /** Action type */
  side: string;
}

/** PiggyBank Purchase/Redemption
 * Request Example:
 * POST /api/v5/asset/purchase_redempt
 * body
 * {
 *     "ccy":"BTC",
 *     "amt":"1",
 *     "side":"purchase"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "ccy": "BTC",
 *     "amt": "1",
 *     "side": "purchase"
 *   }
 * ]
 */
export const FundingPiggybankPurchaseRedemption = (
  params: FundingPiggybankPurchaseRedemptionRequest
): Promise<FundingPiggybankPurchaseRedemptionResponse[]> => {
  return request({
    url: '/api/v5/asset/purchase_redempt',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface FundingAssetBillsDetailsRequest {
  /** Currency */
  ccy?: string;

  /** Bill type1: Deposit2: Withdrawal13: Canceled withdrawal18: Transfer to futures19: Transfer from futures20: Transfer to Sub account21: Transfer from Sub account28: Claim33: Transfer to margin34: Transfer from margin37: Transfer to spot38: Transfer from spot41: Trading fees settled by loyalty points42: Loyalty points purchase47: System reversal48: Received from activities49: Given away to activities50: Received from appointments51: Deducted from appointments52: Red packet sent53: Red packet snatched54: Red packet refunded55: Transfer to perpetual56: Transfer from perpetual59: Transfer from hedging account60: Transfer to hedging account61: Conversion63: Transfer to options62: Transfer from options68: Claim rebate card69: Distribute rebate card72: Token received73: Token given away74: Token refunded75: Subscription to savings76: Redemption to savings77: Distribute78: Lock up79: Node voting80: Staking81: Vote redemption82: Staking redemption83: Staking yield84: Violation fee85: PoW mining yield86: Cloud mining pay87: Cloud mining yield88: Subsidy89: Staking90: Staking subscription91: staking redemption92: Add collateral93: Redeem collateral94: Investment95: Borrower borrows96: Principal transferred in97: Borrower transferred loan out98: Borrower transferred interest out99: Investor transferred interest in102: Prepayment penalty transferred in103: Prepayment penalty transferred out104: Fee transferred in105: Fee transferred out106: Overdue fee transferred in107: Overdue fee transferred out108: Overdue interest transferred out109: Overdue interest transferred in110: Collateral for closed position transferred in111: Collateral for closed position transferred out112: Collateral for liquidation transferred in113: Collateral for liquidation transferred out114: Insurance fund transferred in115: Insurance fund transferred out 116: Place an order117: Fulfill an order118: Cancel an order119: Merchants unlock deposit120: Merchants add deposit121: FiatGateway Place an order122: FiatGateway Cancel an order123: FiatGateway Fulfill an order124: Jumpstart unlocking125: Manual deposit126: Interest deposit127: Investment fee transferred in128: Investment fee transferred out129: Rewards transferred in130: Transferred from unified account131: Transferred to unified account */
  type?: string;

  /** Pagination of data to return records earlier than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  after?: string;

  /** Pagination of data to return records newer than the requested ts, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  before?: string;

  /** Number of results per request. The maximum is 100; the default is 100. */
  limit?: string;
}

export interface FundingAssetBillsDetailsResponse {
  /** Bill ID */
  billId: string;

  /** Account balance currency */
  ccy: string;

  /** Change in balance at the account level */
  balChg: string;

  /** Balance at the account level */
  bal: string;

  /** Bill type */
  type: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g.1597026383085 */
  ts: string;
}

/** Asset Bills Details
 * Request Example:
 * GET /api/v5/asset/bills
 *
 * GET /api/v5/asset/bills?type=1
 *
 *
 * Response Example:
 * [
 *   {
 *     "billId": "12344",
 *     "ccy": "BTC",
 *     "balChg": "2",
 *     "bal": "12",
 *     "type": "1",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const FundingAssetBillsDetails = (
  params: FundingAssetBillsDetailsRequest
): Promise<FundingAssetBillsDetailsResponse[]> => {
  return request({
    url: '/api/v5/asset/bills',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetTickersRequest {
  /** Instrument type SPOT  SWAP FUTURES  OPTION */
  instType: string;

  /** Underlying, e.g. BTC-USDOnly applicable toFUTURES/SWAP/OPTION */
  uly?: string;
}

export interface MarketDataGetTickersResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Last traded price */
  last: string;

  /** Last traded size */
  lastSz: string;

  /** Best ask price */
  askPx: string;

  /** Best ask size */
  askSz: string;

  /** Best bid price */
  bidPx: string;

  /** Best bid size */
  bidSz: string;

  /** Open price in the past 24 hours */
  open24h: string;

  /** Highest price in the past 24 hours */
  high24h: string;

  /** Lowest price in the past 24 hours */
  low24h: string;

  /** 24h trading volume, with a unit of currency.If it is a derivatives contract, the value is the number of settlement currency.If it is SPOT/MARGIN, the value is the number of quote currency. */
  volCcy24h: string;

  /** 24h trading volume, with a unit of contact.If it is a derivatives contract, the value is the number of contracts.If it is SPOT/MARGIN, the value is the amount of trading currency. */
  vol24h: string;

  /** Open price in the UTC 0 */
  sodUtc0: string;

  /** Open price in the UTC 8 */
  sodUtc8: string;

  /** Ticker data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Tickers
 * Request Example:
 * GET /api/v5/market/tickers?instId=BTC-USD-SWAP
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USD-SWAP",
 *     "last": "56956.1",
 *     "lastSz": "3",
 *     "askPx": "56959.1",
 *     "askSz": "10582",
 *     "bidPx": "56959",
 *     "bidSz": "4552",
 *     "open24h": "55926",
 *     "high24h": "57641.1",
 *     "low24h": "54570.1",
 *     "volCcy24h": "81137.755",
 *     "vol24h": "46258703",
 *     "ts": "1620289117764",
 *     "sodUtc0": "55926",
 *     "sodUtc8": "55926"
 *   }
 * ]
 */
export const MarketDataGetTickers = (
  params: MarketDataGetTickersRequest
): Promise<MarketDataGetTickersResponse[]> => {
  return request({
    url: '/api/v5/market/tickers',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetTickerRequest {
  /** Instrument ID, e.g. BTC-USD-SWAP */
  instId: string;
}

export interface MarketDataGetTickerResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Last traded price */
  last: string;

  /** Last traded size */
  lastSz: string;

  /** Best ask price */
  askPx: string;

  /** Best ask size */
  askSz: string;

  /** Best bid price */
  bidPx: string;

  /** Best bid size */
  bidSz: string;

  /** Open price in the past 24 hours */
  open24h: string;

  /** Highest price in the past 24 hours */
  high24h: string;

  /** Lowest price in the past 24 hours */
  low24h: string;

  /** 24h trading volume, with a unit of currency.If it is a derivatives contract, the value is the number of settlement currency.If it is SPOT/MARGIN, the value is the number of quote currency. */
  volCcy24h: string;

  /** 24h trading volume, with a unit of contact.If it is a derivatives contract, the value is the number of contracts.If it is SPOT/MARGIN, the value is the amount of trading currency. */
  vol24h: string;

  /** Open price in the UTC 0 */
  sodUtc0: string;

  /** Open price in the UTC 8 */
  sodUtc8: string;

  /** Ticker data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085. */
  ts: string;
}

/** Get Ticker
 * Request Example:
 * GET /api/v5/market/ticker?instId=BTC-USD-SWAP
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USD-SWAP",
 *     "last": "9999.99",
 *     "lastSz": "0.1",
 *     "askPx": "9999.99",
 *     "askSz": "11",
 *     "bidPx": "8888.88",
 *     "bidSz": "5",
 *     "open24h": "9000",
 *     "high24h": "10000",
 *     "low24h": "8888.88",
 *     "volCcy24h": "2222",
 *     "vol24h": "2222",
 *     "sodUtc0": "2222",
 *     "sodUtc8": "2222",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const MarketDataGetTicker = (
  params: MarketDataGetTickerRequest
): Promise<MarketDataGetTickerResponse[]> => {
  return request({
    url: '/api/v5/market/ticker',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetIndexTickersRequest {
  /** Quote currencyCurrently there is only an index with USD/USDT/BTC as the quote currency. */
  quoteCcy?: string;

  /** Index, e.g. BTC-USDEither quoteCcy or instId is required. */
  instId?: string;
}

export interface MarketDataGetIndexTickersResponse {
  /** Index */
  instId: string;

  /** Latest index price */
  idxPx: string;

  /** Highest price in the past 24 hours */
  high24h: string;

  /** Lowest price in the past 24 hours */
  low24h: string;

  /** Open price in the past 24 hours */
  open24h: string;

  /** Open price in the UTC 0 */
  sodUtc0: string;

  /** Open price in the UTC 8 */
  sodUtc8: string;

  /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Index Tickers
 * Request Example:
 * GET /api/v5/market/index-tickers?quoteCcy=BTC
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT",
 *     "idxPx": "0.1",
 *     "high24h": "0.5",
 *     "low24h": "0.1",
 *     "open24h": "0.1",
 *     "sodUtc0": "2222",
 *     "sodUtc8": "2222",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const MarketDataGetIndexTickers = (
  params: MarketDataGetIndexTickersRequest
): Promise<MarketDataGetIndexTickersResponse[]> => {
  return request({
    url: '/api/v5/market/index-tickers',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetOrderBookRequest {
  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Order book depth per side. Maximum 400, e.g. 400 bids + 400 asks  Default returns to 1 depth data */
  sz?: string;
}

export interface MarketDataGetOrderBookResponse {
  /** Order book on sell side */
  asks: string[];

  /** Order book on buy side */
  bids: string[];

  /** Order book generation time */
  ts: string;
}

/** Get Order Book
 * Request Example:
 * GET /api/v5/market/books?instId=BTC-USD-SWAP
 *
 * Response Example:
 * [
 *   {
 *     "asks": [
 *       [
 *         "411.8",
 *         "10",
 *         "0",
 *         "8"
 *       ],
 *       [
 *         "1",
 *         "2",
 *         "3",
 *         "6"
 *       ]
 *     ],
 *     "bids": [
 *       [
 *         "1",
 *         "2",
 *         "3",
 *         "6"
 *       ],
 *       [
 *         "1",
 *         "2",
 *         "3",
 *         "6"
 *       ]
 *     ],
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const MarketDataGetOrderBook = (
  params: MarketDataGetOrderBookRequest
): Promise<MarketDataGetOrderBookResponse[]> => {
  return request({
    url: '/api/v5/market/books',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetCandlesticksRequest {
  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Pagination of data to return records earlier than the requested ts */
  after?: string;

  /** Pagination of data to return records newer than the requested ts */
  before?: string;

  /** Bar size, the default is 1me.g. [1m/3m/5m/15m/30m/1H/2H/4H/6H/12H/1D/1W/1M/3M/6M/1Y] */
  bar?: string;

  /** Number of results per request. The maximum is 100; The default is 100. */
  limit?: string;
}

export interface MarketDataGetCandlesticksResponse {
  /** Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;

  /** Open price */
  o: string;

  /** Higest price */
  h: string;

  /** Lowest price */
  l: string;

  /** Close price */
  c: string;

  /** Trading volume, with a unit of contact.If it is a derivatives contract, the value is the number of contracts.If it is SPOT/MARGIN, the value is the amount of trading currency. */
  vol: string;

  /** Trading volume, with a unit of currency.If it is a derivatives contract, the value is the number of settlement currency.If it is SPOT/MARGIN, the value is the number of quote currency. */
  volCcy: string;
}

/** Get Candlesticks
 * Request Example:
 * GET /api/v5/market/candles?instId=BTC-USD-190927-5000-C
 *
 * Response Example:
 * [
 *   [
 *     "1597026383085",
 *     "3.721",
 *     "3.743",
 *     "3.677",
 *     "3.708",
 *     "8422410",
 *     "22698348.04828491"
 *   ],
 *   [
 *     "1597026383085",
 *     "3.731",
 *     "3.799",
 *     "3.494",
 *     "3.72",
 *     "24912403",
 *     "67632347.24399722"
 *   ]
 * ]
 */
export const MarketDataGetCandlesticks = (
  params: MarketDataGetCandlesticksRequest
): Promise<MarketDataGetCandlesticksResponse[]> => {
  return request({
    url: '/api/v5/market/candles',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetCandlesticksHistoryTopCurrenciesOnlyRequest {
  /** Instrument ID, e.g. BTC-USD-200927 */
  instId: string;

  /** Pagination of data to return records earlier than the requested ts */
  after?: string;

  /** Pagination of data to return records newer than the requested ts */
  before?: string;

  /** Bar size, the default is 1me.g. [1m/3m/5m/15m/30m/1H/2H/4H/6H/12H/1D/1W/1M/3M/6M/1Y] */
  bar?: string;

  /** Number of results per request. The maximum is 100; the default is 100. */
  limit?: string;
}

export interface MarketDataGetCandlesticksHistoryTopCurrenciesOnlyResponse {
  /** Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;

  /** Open price */
  o: string;

  /** Highest price */
  h: string;

  /** Lowest price */
  l: string;

  /** Close price */
  c: string;

  /** Trading volume, with a unit of contact.If it is a derivatives contract, the value is the number of contracts.If it is SPOT/MARGIN, the value is the amount of trading currency. */
  vol: string;

  /** Trading volume, with a unit of currency.If it is a derivatives contract, the value is the number of settlement currency.If it is SPOT/MARGIN, the value is the number of quote currency. */
  volCcy: string;
}

/** Get Candlesticks History（top currencies only）
 * Request Example:
 * GET /api/v5/market/history-candles?instId=BTC-USD-190927
 *
 * Response Example:
 * [
 *   [
 *     "1597026383085",
 *     "3.721",
 *     "3.743",
 *     "3.677",
 *     "3.708",
 *     "8422410",
 *     "22698348.04828491"
 *   ],
 *   [
 *     "1597026383085",
 *     "3.731",
 *     "3.799",
 *     "3.494",
 *     "3.72",
 *     "24912403",
 *     "67632347.24399722"
 *   ]
 * ]
 */
export const MarketDataGetCandlesticksHistoryTopCurrenciesOnly = (
  params: MarketDataGetCandlesticksHistoryTopCurrenciesOnlyRequest
): Promise<MarketDataGetCandlesticksHistoryTopCurrenciesOnlyResponse[]> => {
  return request({
    url: '/api/v5/market/history-candles',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetIndexCandlesticksRequest {
  /** Index, e.g. BTC-USD */
  instId: string;

  /** Pagination of data to return records earlier than the requested ts */
  after?: string;

  /** Pagination of data to return records newer than the requested ts */
  before?: string;

  /** Bar size, the default is 1me.g. [1m/3m/5m/15m/30m/1H/2H/4H/6H/12H/1D/1W/1M/3M/6M/1Y] */
  bar?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface MarketDataGetIndexCandlesticksResponse {
  /** Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;

  /** Open price */
  o: string;

  /** Higest price */
  h: string;

  /** Lowest price */
  l: string;

  /** Close price */
  c: string;
}

/** Get Index Candlesticks
 * Request Example:
 * GET /api/v5/market/index-candles?instId=BTC-USD
 *
 * Response Example:
 * [
 *   [
 *     "1597026383085",
 *     "3.721",
 *     "3.743",
 *     "3.677",
 *     "3.708"
 *   ],
 *   [
 *     "1597026383085",
 *     "3.731",
 *     "3.799",
 *     "3.494",
 *     "3.72"
 *   ]
 * ]
 */
export const MarketDataGetIndexCandlesticks = (
  params: MarketDataGetIndexCandlesticksRequest
): Promise<MarketDataGetIndexCandlesticksResponse[]> => {
  return request({
    url: '/api/v5/market/index-candles',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetMarkPriceCandlesticksRequest {
  /** Instrument ID, e.g. BTC-USD-SWAP */
  instId: string;

  /** Pagination of data to return records earlier than the requested ts */
  after?: string;

  /** Pagination of data to return records newer than the requested ts */
  before?: string;

  /** Bar size, the default is 1me.g. [1m/3m/5m/15m/30m/1H/2H/4H/6H/12H/1D/1W/1M/3M/6M/1Y] */
  bar?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface MarketDataGetMarkPriceCandlesticksResponse {
  /** Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;

  /** Open price */
  o: string;

  /** Higest price */
  h: string;

  /** Lowest price */
  l: string;

  /** Close price */
  c: string;
}

/** Get Mark Price Candlesticks
 * Request Example:
 * GET /api/v5/market/mark-price-candles?instId=BTC-USD-SWAP
 *
 * Response Example:
 * [
 *   [
 *     "1597026383085",
 *     "3.721",
 *     "3.743",
 *     "3.677",
 *     "3.708"
 *   ],
 *   [
 *     "1597026383085",
 *     "3.731",
 *     "3.799",
 *     "3.494",
 *     "3.72"
 *   ]
 * ]
 */
export const MarketDataGetMarkPriceCandlesticks = (
  params: MarketDataGetMarkPriceCandlesticksRequest
): Promise<MarketDataGetMarkPriceCandlesticksResponse[]> => {
  return request({
    url: '/api/v5/market/mark-price-candles',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetTradesRequest {
  /** Instrument ID, e.g. BTC-USD */
  instId: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface MarketDataGetTradesResponse {
  /** Instrument ID */
  instId: string;

  /** Trade ID */
  tradeId: string;

  /** Trade price */
  px: string;

  /** Trade quantity */
  sz: string;

  /** Trade sidebuy  sell */
  side: string;

  /** Trade time, Unix timestamp format in milliseconds, e.g. 1597026383085. */
  ts: string;
}

/** Get Trades
 * Request Example:
 * GET /api/v5/market/trades?instId=BTC-USDT
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT",
 *     "tradeId": "9",
 *     "px": "0.016",
 *     "sz": "50",
 *     "side": "buy",
 *     "ts": "1597026383085"
 *   },
 *   {
 *     "instId": "BTC-USDT",
 *     "tradeId": "9",
 *     "px": "0.016",
 *     "sz": "50",
 *     "side": "buy",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const MarketDataGetTrades = (
  params: MarketDataGetTradesRequest
): Promise<MarketDataGetTradesResponse[]> => {
  return request({
    url: '/api/v5/market/trades',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface MarketDataGetTotalVolumeResponse {
  /** 24-hour total trading volume on the platform ，"USD" */
  volUsd: string;

  /** 24-hour total trading volume on the platform ，"CNY" */
  volCny: string;

  /** Data return time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get total volume
 * Request Example:
 * GET /api/v5/market/platform-24-volume
 *
 *
 * Response Example:
 * [
 *   {
 *     "volUsd": "2222",
 *     "volCny": "14220.8"
 *   }
 * ]
 */
export const MarketDataGetTotalVolume = (): Promise<MarketDataGetTotalVolumeResponse[]> => {
  return request({
    url: '/api/v5/market/platform-24-volume',
    method: 'GET',

    paramsIn: 'query'
  });
};

export interface MarketDataGetOracleResponse {
  /** abi-encoded values [kind, timestamp, key, value], where kind equals 'prices', timestamp is the time when price was obtained, key is the asset ticker (e.g. btc) and value is the asset price. */
  messages: string;

  /** readable asset prices */
  price: string;

  /** Ethereum-compatible ECDSA signatures for each message */
  signatures: string;

  /** time of latest datapoint */
  timestamp: string;
}

/** Get Oracle
 * Request Example:
 * GET /api/v5/market/oracle
 *
 * Response Example:
 * []
 */
export const MarketDataGetOracle = (): Promise<MarketDataGetOracleResponse> => {
  return request({
    url: '/api/v5/market/oracle',
    method: 'GET',

    paramsIn: 'query'
  });
};

export interface PublicDataGetInstrumentsRequest {
  /** Instrument typeSPOTSWAPFUTURESOPTION */
  instType: string;

  /** UnderlyingOnly applicable to FUTURES/SWAP/OPTION. Required for OPTION. */
  uly?: string;

  /** Instrument ID */
  instId?: string;
}

export interface PublicDataGetInstrumentsResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID,  e.g. BTC-USD-SWAP */
  instId: string;

  /** Underlying, e.g. BTC-USD  Only applicable to FUTURES/SWAP/OPTION */
  uly: string;

  /** Fee schedule */
  category: string;

  /** Base currency, e.g. BTC  inBTC-USDTOnly applicable to SPOT */
  baseCcy: string;

  /** Quote currency, e.g. USDT in BTC-USDT  Only applicable to SPOT */
  quoteCcy: string;

  /** Settlement and margin currency, e.g. BTC Only applicable to FUTURES/SWAP/OPTION */
  settleCcy: string;

  /** Contract value  Only applicable to FUTURES/SWAP/OPTION */
  ctVal: string;

  /** Contract multiplier  Only applicable to FUTURES/SWAP/OPTION */
  ctMult: string;

  /** Contract value currency Only applicable to FUTURES/SWAP/OPTION */
  ctValCcy: string;

  /** Option type, C: Call  P: putOnly applicable to OPTION */
  optType: string;

  /** Strike price Only applicable to OPTION */
  stk: string;

  /** Listing time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  listTime: string;

  /** Expiry time, Unix timestamp format in milliseconds, e.g. 1597026383085Only applicable to FUTURES/OPTION */
  expTime: string;

  /** Leverage,  Not applicable to SPOT, used to distinguish between MARGIN and SPOT. */
  lever: string;

  /** Tick size,  e.g. 0.0001 */
  tickSz: string;

  /** Lot size, e.g. BTC-USDT-SWAP: 1 */
  lotSz: string;

  /** Minimum order size */
  minSz: string;

  /** Contract type linear: linear contractinverse: inverse contractOnly applicable to FUTURES/SWAP */
  ctType: string;

  /** Aliasthis_weeknext_weekquarternext_quarter Only applicable to FUTURES */
  alias: string;

  /** Instrument statuslive suspendpreopen */
  state: string;
}

/** Get Instruments
 * Request Example:
 * GET /api/v5/public/instruments?instType=SPOT
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "LTC-USD-SWAP",
 *     "uly": "LTC-USD",
 *     "category": "1",
 *     "baseCcy": "",
 *     "quoteCcy": "",
 *     "settleCcy": "LTC",
 *     "ctVal": "10",
 *     "ctMult": "1",
 *     "ctValCcy": "USD",
 *     "optType": "C",
 *     "stk": "",
 *     "listTime": "1597026383085",
 *     "expTime": "1597026383085",
 *     "lever": "10",
 *     "tickSz": "0.01",
 *     "lotSz": "1",
 *     "minSz": "1",
 *     "ctType": "linear",
 *     "alias": "this_week",
 *     "state": "live"
 *   }
 * ]
 */
export const PublicDataGetInstruments = (
  params: PublicDataGetInstrumentsRequest
): Promise<PublicDataGetInstrumentsResponse[]> => {
  return request({
    url: '/api/v5/public/instruments',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetDeliveryExerciseHistoryRequest {
  /** Instrument type FUTURES  OPTION */
  instType: string;

  /** Underlying, only applicable to FUTURES/OPTION */
  uly: string;

  /** Pagination of data to return records earlier than the requested ts */
  after?: string;

  /** Pagination of data to return records newer than the requested ts */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface PublicDataGetDeliveryExerciseHistoryResponse {
  /** Delivery/exercise time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;

  /** Detailed */
  details: {
    /** Delivery/exercise contract ID */
    instId: string;

    /** Delivery/exercise price */
    px: string;

    /** Type  delivery exercised expired_otm */
    type: string;
  }[];
}

/** Get Delivery/Exercise History
 * Request Example:
 * GET /api/v5/public/delivery-exercise-history?instType=OPTION&Underlying=BTC-USD
 *
 * Response Example:
 * [
 *   {
 *     "ts": "1597026383085",
 *     "details": [
 *       {
 *         "type": "delivery",
 *         "instId": "BTC-USD-190927",
 *         "px": "0.016"
 *       }
 *     ]
 *   },
 *   {
 *     "ts": "1597026383085",
 *     "details": [
 *       {
 *         "instId": "BTC-USD-200529-6000-C",
 *         "type": "exercised",
 *         "px": "0.016"
 *       },
 *       {
 *         "instId": "BTC-USD-200529-8000-C",
 *         "type": "exercised",
 *         "px": "0.016"
 *       }
 *     ]
 *   }
 * ]
 */
export const PublicDataGetDeliveryExerciseHistory = (
  params: PublicDataGetDeliveryExerciseHistoryRequest
): Promise<PublicDataGetDeliveryExerciseHistoryResponse[]> => {
  return request({
    url: '/api/v5/public/delivery-exercise-history',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetOpenInterestRequest {
  /** Instrument typeSWAP FUTURES OPTION */
  instType: string;

  /** Underlying, only applicable to FUTURES/SWAP/OPTION. Required for OPTION. */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-180216  Only applicable to FUTURES/SWAP/OPTION */
  instId?: string;
}

export interface PublicDataGetOpenInterestResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Open InsteREST (cont) */
  oi: string;

  /** Open InsteREST (coin) */
  oiCcy: string;

  /** Data return time,  Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Open Interest
 * Request Example:
 * GET /api/v5/public/open-interest?instType=SWAP
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-SWAP",
 *     "oi": "5000",
 *     "oiCcy": "555.55",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetOpenInterest = (
  params: PublicDataGetOpenInterestRequest
): Promise<PublicDataGetOpenInterestResponse[]> => {
  return request({
    url: '/api/v5/public/open-interest',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetFundingRateRequest {
  /** Instrument ID, e.g. BTC-USD-SWAP only applicable to SWAP */
  instId: string;
}

export interface PublicDataGetFundingRateResponse {
  /** Instrument type  SWAP */
  instType: string;

  /** Instrument ID, e.g. BTC-USD-SWAP */
  instId: string;

  /** Current funding rate */
  fundingRate: string;

  /** Forecast funding rate for the next period */
  nextFundingRate: string;

  /** Settlement time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  fundingTime: string;
}

/** Get Funding Rate
 * Request Example:
 * GET /api/v5/public/funding-rate?instId=BTC-USD-SWAP
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-SWAP",
 *     "fundingRate": "0.018",
 *     "nextFundingRate": "0.017",
 *     "fundingTime": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetFundingRate = (
  params: PublicDataGetFundingRateRequest
): Promise<PublicDataGetFundingRateResponse[]> => {
  return request({
    url: '/api/v5/public/funding-rate',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetFundingRateHistoryRequest {
  /** Instrument ID, e.g. BTC-USD-SWAP only applicable to SWAP */
  instId: string;

  /** Pagination of data to return records newer than the requested ts */
  after?: string;

  /** Pagination of data to return records earlier than the requested ts */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface PublicDataGetFundingRateHistoryResponse {
  /** Instrument type SWAP */
  instType: string;

  /** Instrument ID, e.g. BTC-USD-SWAP */
  instId: string;

  /** Current funding rate */
  fundingRate: string;

  /** Actual funding rate */
  realizedRate: string;

  /** Settlement time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  fundingTime: string;
}

/** Get Funding Rate History
 * Request Example:
 * GET /api/v5/public/funding-rate-history?instId=BTC-USD-SWAP
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-SWAP",
 *     "fundingRate": "0.018",
 *     "realizedRate": "0.017",
 *     "fundingTime": "1597026383085"
 *   },
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-SWAP",
 *     "fundingRate": "0.018",
 *     "realizedRate": "0.017",
 *     "fundingTime": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetFundingRateHistory = (
  params: PublicDataGetFundingRateHistoryRequest
): Promise<PublicDataGetFundingRateHistoryResponse[]> => {
  return request({
    url: '/api/v5/public/funding-rate-history',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetLimitPriceRequest {
  /** Instrument ID, e.g. BTC-USD-180216  only applicable to FUTURES/SWAP/OPTION */
  instId: string;
}

export interface PublicDataGetLimitPriceResponse {
  /** Instrument typeSWAP FUTURESOPTION */
  instType: string;

  /** Instrument ID, e.g. BTC-USD-200214 */
  instId: string;

  /** Highest buy limit */
  buyLmt: string;

  /** Lowest sell limit */
  sellLmt: string;

  /** Data return time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Limit Price
 * Request Example:
 * GET /api/v5/public/price-limit?instId=BTC-USD-180216
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-SWAP",
 *     "buyLmt": "200",
 *     "sellLmt": "300",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetLimitPrice = (
  params: PublicDataGetLimitPriceRequest
): Promise<PublicDataGetLimitPriceResponse[]> => {
  return request({
    url: '/api/v5/public/price-limit',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetOptionMarketDataRequest {
  /** Underlying, only applicable to OPTION */
  uly: string;

  /** Contract expiry date, the format is "YYMMDD", e.g. "200527" */
  expTime?: string;
}

export interface PublicDataGetOptionMarketDataResponse {
  /** Instrument typeOPTION */
  instType: string;

  /** Instrument ID, e.g. BTC-USD-200103-5500-C */
  instId: string;

  /** Underlying */
  uly: string;

  /** Sensitivity of option price to uly price */
  delta: string;

  /** The delta's sensitivity to uly price */
  gamma: string;

  /** Sensitivity of option price to implied volatility */
  vega: string;

  /** Sensitivity of option price to remaining maturity */
  theta: string;

  /** Sensitivity of option price to uly price in BS mode */
  deltaBS: string;

  /** The delta's sensitivity to uly price in BS mode */
  gammaBS: string;

  /** Sensitivity of option price to implied volatility in BS mode */
  vegaBS: string;

  /** Sensitivity of option price to remaining maturity in BS mode */
  thetaBS: string;

  /** Leverage */
  lever: string;

  /** Mark volatility */
  markVol: string;

  /** Bid volatility */
  bidVol: string;

  /** Ask volatility */
  askVol: string;

  /** Realized volatility (not currently used) */
  realVol: string;

  /** Data return time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Option Market Data
 * Request Example:
 * GET /api/v5/public/opt-summary?uly=BTC-USD
 *
 * Response Example:
 * [
 *   {
 *     "instType": "OPTION",
 *     "instId": "BTC-USD-200103-5500-C",
 *     "uly": "BTC-USD",
 *     "delta": "0.7494223636",
 *     "gamma": "-0.6765419039",
 *     "theta": "-0.0000809873",
 *     "vega": "0.0000077307",
 *     "deltaBS": "0.7494223636",
 *     "gammaBS": "-0.6765419039",
 *     "thetaBS": "-0.0000809873",
 *     "vegaBS": "0.0000077307",
 *     "realVol": "0",
 *     "bidVol": "",
 *     "askVol": "1.5625",
 *     "markVol": "0.9987",
 *     "lever": "4.0342",
 *     "ts": "1597026383085"
 *   },
 *   {
 *     "instType": "OPTION",
 *     "instId": "BTC-USD-200103-6500-C",
 *     "uly": "BTC-USD",
 *     "delta": "0.7494223636",
 *     "gamma": "-0.6765419039",
 *     "theta": "-0.0000809873",
 *     "vega": "0.0000077307",
 *     "deltaBS": "0.7494223636",
 *     "gammaBS": "-0.6765419039",
 *     "thetaBS": "-0.0000809873",
 *     "vegaBS": "0.0000077307",
 *     "realVol": "0",
 *     "bidVol": "",
 *     "askVol": "1.5625",
 *     "markVol": "0.9987",
 *     "lever": "4.0342",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetOptionMarketData = (
  params: PublicDataGetOptionMarketDataRequest
): Promise<PublicDataGetOptionMarketDataResponse[]> => {
  return request({
    url: '/api/v5/public/opt-summary',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetEstimatedDeliveryExcercisePriceRequest {
  /** Instrument ID,  e.g. BTC-USD-200214 only applicable to FUTURES/OPTION */
  instId: string;
}

export interface PublicDataGetEstimatedDeliveryExcercisePriceResponse {
  /** Instrument type FUTURES OPTION */
  instType: string;

  /** Instrument ID,  e.g. BTC-USD-180216 */
  instId: string;

  /** Estimated delivery price */
  settlePx: string;

  /** Data return time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Estimated Delivery/Excercise Price
 * Request Example:
 * GET /api/v5/public/estimated-price?instId=BTC-USDT-191227
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-201227",
 *     "settlePx": "200",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetEstimatedDeliveryExcercisePrice = (
  params: PublicDataGetEstimatedDeliveryExcercisePriceRequest
): Promise<PublicDataGetEstimatedDeliveryExcercisePriceResponse[]> => {
  return request({
    url: '/api/v5/public/estimated-price',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetDiscountRateAndInterestFreeQuotaRequest {
  /** Currency */
  ccy?: string;

  /** Discount level1:level 1 2:level 2 3:level 3 4:level 4 5:level 5 */
  discountLv?: string;
}

export interface PublicDataGetDiscountRateAndInterestFreeQuotaResponse {
  /** Currency */
  ccy: string;

  /** Interest-free quota */
  amt: string;

  /** Discount rate level Discount rate level intruduction */
  discountLv: string;

  /** Discount details */
  discountInfo: {
    /** Discount rate */
    discountRate: string;

    /** Tier -upper bound */
    maxAmt: string;

    /** Tier -lower bound */
    minAmt: string;
  }[];
}

/** Get Discount Rate And Interest-Free Quota
 * Request Example:
 * GET /api/v5/public/discount-rate-interest-free-quota?ccy=BTC
 *
 * Response Example:
 * [
 *   {
 *     "amt": "1",
 *     "ccy": "LTC",
 *     "discountInfo": [
 *       {
 *         "discountRate": "0.95",
 *         "maxAmt": "2000000",
 *         "minAmt": "0"
 *       },
 *       {
 *         "discountRate": "0.85",
 *         "maxAmt": "4000000",
 *         "minAmt": "2000000"
 *       },
 *       {
 *         "discountRate": "0.5",
 *         "maxAmt": "8000000",
 *         "minAmt": "4000000"
 *       },
 *       {
 *         "discountRate": "0",
 *         "maxAmt": "",
 *         "minAmt": "8000000"
 *       }
 *     ],
 *     "discountLv": "2"
 *   }
 * ]
 */
export const PublicDataGetDiscountRateAndInterestFreeQuota = (
  params: PublicDataGetDiscountRateAndInterestFreeQuotaRequest
): Promise<PublicDataGetDiscountRateAndInterestFreeQuotaResponse[]> => {
  return request({
    url: '/api/v5/public/discount-rate-interest-free-quota',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetSystemTimeResponse {
  /** System time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get System Time
 * Request Example:
 * GET /api/v5/public/time
 *
 * Response Example:
 * [
 *   {
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetSystemTime = (): Promise<PublicDataGetSystemTimeResponse[]> => {
  return request({
    url: '/api/v5/public/time',
    method: 'GET',

    paramsIn: 'query'
  });
};

export interface PublicDataGetLiquidationOrdersRequest {
  /** Instrument type MARGIN  SWAP  FUTURES OPTION */
  instType: string;

  /** Margin mode isolatedcross */
  mgnMode?: string;

  /** Instrument ID, only applicable to MARGIN */
  instId?: string;

  /** Liquidation currency, only applicable to cross MARGIN */
  ccy?: string;

  /** Underlying Required for FUTURES/SWAP/OPTION */
  uly?: string;

  /** this_week next_week  quarter next_quarterRequired for FUTURES */
  alias?: string;

  /** State unfilled  filledunfilled by default */
  state?: string;

  /** Pagination of data to return records newer than the requested ts */
  before?: string;

  /** Pagination of data to return records earlier than the requested ts */
  after?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface PublicDataGetLiquidationOrdersResponse {
  /** Instrument type */
  instType: string;

  /** Total loss in the current period under the current underlying, cleared at 16:00 (UTC+8) every day. The unit is USDT */
  totalLoss: string;

  /** Instrument ID, e.g. BTC-USD-SWAP */
  instId: string;

  /** Underlying, only applicable to FUTURES/SWAP/OPTION */
  uly: string;

  /** Details */
  details: {
    /** Order side, buy  sell */
    side: string;

    /** Position side，long  shortCombination of side and posSide ,sell/long : Close long ; buy/short:Close short */
    posSide: string;

    /** Bankruptcy price */
    bkPx: string;

    /** Number of liquidations */
    sz: string;

    /** Number of losses */
    bkLoss: string;

    /** Liquidation currency, only applicable to  MARGIN */
    ccy: string;

    /** Liquidation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
    ts: string;
  }[];
}

/** Get Liquidation Orders
 * Request Example:
 * GET /api/v5/public/liquidation-orders?instType=MARGIN
 *
 * Response Example:
 * [
 *   {
 *     "instType": "2",
 *     "totalLoss": "123",
 *     "instId": "btc",
 *     "uly": "123",
 *     "details": [
 *       {
 *         "side": "buy",
 *         "posSide": "short",
 *         "bkPx": "1234",
 *         "sz": "1415",
 *         "bkLoss": "14",
 *         "ccy": "",
 *         "ts": "1597026383085"
 *       },
 *       {
 *         "side": "buy",
 *         "posSide": "short",
 *         "bkPx": "1234",
 *         "sz": "1415",
 *         "bkLoss": "14",
 *         "ccy": "",
 *         "ts": "1597026383085"
 *       }
 *     ]
 *   }
 * ]
 */
export const PublicDataGetLiquidationOrders = (
  params: PublicDataGetLiquidationOrdersRequest
): Promise<PublicDataGetLiquidationOrdersResponse[]> => {
  return request({
    url: '/api/v5/public/liquidation-orders',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetMarkPriceRequest {
  /** Instrument type MARGIN SWAP  FUTURES OPTION */
  instType: string;

  /** Underlying */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-SWAP */
  instId?: string;
}

export interface PublicDataGetMarkPriceResponse {
  /** Instrument type MARGIN SWAP  FUTURES OPTION */
  instType: string;

  /** Instrument ID, e.g. BTC-USD-200214 */
  instId: string;

  /** Mark price */
  markPx: string;

  /** Data return time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  ts: string;
}

/** Get Mark Price
 * Request Example:
 * GET /api/v5/public/mark-price?instType=SWAP
 *
 * Response Example:
 * [
 *   {
 *     "instType": "SWAP",
 *     "instId": "BTC-USDT-SWAP",
 *     "markPx": "200",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const PublicDataGetMarkPrice = (
  params: PublicDataGetMarkPriceRequest
): Promise<PublicDataGetMarkPriceResponse[]> => {
  return request({
    url: '/api/v5/public/mark-price',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetPositionTiersRequest {
  /** Instrument type MARGIN SWAP  FUTURES OPTION */
  instType: string;

  /** Underlying */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId?: string;

  /** Trade modeMargin mode cross isolated */
  tdMode: string;

  /** currencyOnly applicable to MARGIN */
  ccy?: string;

  /** Tiers */
  tier?: string;
}

export interface PublicDataGetPositionTiersResponse {
  /** Underlying */
  uly: string;

  /** Instrument ID */
  instId: string;

  /** Tiers */
  tier: string;

  /** The minimum position of this gear is only applicable to options/perpetual/delivery, the minimum position is 0 by default */
  minAmt: string;

  /** The maximum number of positions held in this position is only applicable to options/perpetual/delivery */
  maxAmt: string;

  /** Maintenance margin requirement in USD level */
  mmr: string;

  /** Initial margin requirement in USD level */
  imr: string;

  /** Maximum available leverage */
  maxLever: string;

  /** Option Margin Coefficient (only applicable to options) */
  optMgnFactor: string;

  /** uote currency Maximum borrowable (only applicable to leverage) */
  quoteMaxBorrow: string;

  /** Base currency Maximum borrowable (only applicable to leverage) */
  baseMaxBorrow: string;
}

/** Get Position Tiers
 * Request Example:
 * GET /api/v5/public/tier
 *
 * Response Example:
 * [
 *   {
 *     "baseMaxBorrow": "",
 *     "imr": "0.008",
 *     "instId": "",
 *     "maxAmt": "200",
 *     "maxLever": "125",
 *     "minAmt": "0",
 *     "mmr": "0.004",
 *     "optMgnFactor": "0",
 *     "quoteMaxBorrow": "",
 *     "tier": "1",
 *     "uly": "BTC-USDT"
 *   }
 * ]
 */
export const PublicDataGetPositionTiers = (
  params: PublicDataGetPositionTiersRequest
): Promise<PublicDataGetPositionTiersResponse[]> => {
  return request({
    url: '/api/v5/public/tier',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface PublicDataGetInterestRateAndLoanQuotaResponse {
  /** basic */
  basic: {
    /** currency */
    ccy: string;

    /** Daily rate */
    rate: string;

    /** Max borrow */
    quota: string;
  }[];

  /** vip users */
  vip: {
    /** level */
    level: string;

    /** loan quota coef */
    loanQuotaCoef: string;

    /** interest rate discount */
    irDiscount: string;
  }[];

  /** regular users */
  regular: {
    /** level */
    level: string;

    /** loan quota coef */
    loanQuotaCoef: string;

    /** interest rate discount */
    irDiscount: string;
  }[];
}

/** Get Interest Rate and Loan Quota
 * Request Example:
 * GET /api/v5/public/interest-rate-loan-quota
 *
 * Response Example:
 * [
 *   {
 *     "basic": [
 *       {
 *         "ccy": "USDT",
 *         "quota": "300000",
 *         "rate": "0.00024984"
 *       }
 *     ],
 *     "vip": [
 *       {
 *         "irDiscount": "0.7",
 *         "loanQuotaCoef": 6,
 *         "level": "VIP1"
 *       },
 *       {
 *         "irDiscount": "0.65",
 *         "loanQuotaCoef": 7,
 *         "level": "VIP2"
 *       }
 *     ],
 *     "regular": [
 *       {
 *         "irDiscount": "1",
 *         "loanQuotaCoef": 1,
 *         "level": "Lv1"
 *       },
 *       {
 *         "irDiscount": "0.95",
 *         "loanQuotaCoef": 2,
 *         "level": "Lv2"
 *       }
 *     ]
 *   }
 * ]
 */
export const PublicDataGetInterestRateAndLoanQuota = (): Promise<PublicDataGetInterestRateAndLoanQuotaResponse[]> => {
  return request({
    url: '/api/v5/public/interest-rate-loan-quota',
    method: 'GET',

    paramsIn: 'query'
  });
};

export interface PublicDataGetUnderlyingRequest {
  /** Instrument type SWAP  FUTURES OPTION */
  instType: string;
}

export interface PublicDataGetUnderlyingResponse {
  /** Underlying */
  uly: string[];
}

/** Get Underlying
 * Request Example:
 * GET /api/v5/public/underlying?instType=FUTURES
 *
 * Response Example:
 * [
 *   [
 *     "LTC-USDT",
 *     "BTC-USDT",
 *     "ETC-USDT"
 *   ]
 * ]
 */
export const PublicDataGetUnderlying = (
  params: PublicDataGetUnderlyingRequest
): Promise<PublicDataGetUnderlyingResponse[]> => {
  return request({
    url: '/api/v5/public/underlying',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradePlaceOrderRequest {
  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Trade modeMargin mode cross isolatedNon-Margin mode cash */
  tdMode: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy?: string;

  /** Client-supplied order ID A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. */
  clOrdId?: string;

  /** Order tag A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 8 characters. */
  tag?: string;

  /** Order side, buy sell */
  side: string;

  /** Position side Required in the long/short mode, and can only be long or short. */
  posSide?: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType: string;

  /** Quantity to buy or sell. */
  sz: string;

  /** Order price. Only applicable to limit order. */
  px?: string;

  /** Whether to reduce position only or not, true false, the default is false.Only applicable to MARGIN orders */
  reduceOnly?: boolean;
}

export interface TradePlaceOrderResponse {
  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Order tag */
  tag: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Place Order
 * Request Example:
 *  place order for SPOT
 *  POST /api/v5/trade/order
 *  body
 *  {
 *     "instId":"BTC-USDT",
 *     "tdMode":"cash",
 *     "clOrdId":"b15",
 *     "side":"buy",
 *     "ordType":"limit",
 *     "px":"2.15",
 *     "sz":"2"
 * }
 *
 * Response Example:
 * [
 *   {
 *     "clOrdId": "oktswap6",
 *     "ordId": "312269865356374016",
 *     "tag": "",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradePlaceOrder = (
  params: TradePlaceOrderRequest
): Promise<TradePlaceOrderResponse[]> => {
  return request({
    url: '/api/v5/trade/order',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradePlaceMultipleOrdersRequest {
  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Trade modeMargin mode cross isolatedNon-Margin mode cash */
  tdMode: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy?: string;

  /** Client-supplied order ID A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. */
  clOrdId?: string;

  /** Order tagA combination of case-sensitive alphanumerics, all numbers, or all letters of up to 8 characters. */
  tag?: string;

  /** Order side buy sell */
  side: string;

  /** Position sideRequired in long/short mode, and can only be long or short. */
  posSide?: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Price */
  px?: string;

  /** Whether reduce position only or nottrue false, the default is false. */
  reduceOnly?: boolean;
}

export interface TradePlaceMultipleOrdersResponse {
  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Order tag */
  tag: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Place Multiple Orders
 * Request Example:
 *  batch place order for SPOT
 *  POST /api/v5/trade/batch-orders
 *  body
 *  [
 *     {
 *         "instId":"BTC-USDT",
 *         "tdMode":"cash",
 *         "clOrdId":"b15",
 *         "side":"buy",
 *         "ordType":"limit",
 *         "px":"2.15",
 *         "sz":"2"
 *     },
 *     {
 *         "instId":"BTC-USDT",
 *         "tdMode":"cash",
 *         "clOrdId":"b15",
 *         "side":"buy",
 *         "ordType":"limit",
 *         "px":"2.15",
 *         "sz":"2"
 *     }
 * ]
 *
 *
 * Response Example:
 * [
 *   {
 *     "clOrdId": "oktswap6",
 *     "ordId": "12345689",
 *     "tag": "",
 *     "sCode": "0",
 *     "sMsg": ""
 *   },
 *   {
 *     "clOrdId": "oktswap7",
 *     "ordId": "12344",
 *     "tag": "",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradePlaceMultipleOrders = (
  params: TradePlaceMultipleOrdersRequest[]
): Promise<TradePlaceMultipleOrdersResponse[]> => {
  return request({
    url: '/api/v5/trade/batch-orders',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeCancelOrderRequest {
  /** Instrument ID, e.g. BTC-USD-190927 */
  instId: string;

  /** Order IDEither ordId or clOrdId is required. If both are passed, ordId will be used. */
  ordId?: string;

  /** Client-supplied order ID */
  clOrdId?: string;
}

export interface TradeCancelOrderResponse {
  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Cancel Order
 * Request Example:
 * POST /api/v5/trade/cancel-order
 * body
 * {
 *     "ordId":"2510789768709120",
 *     "instId":"BTC-USD-190927"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "clOrdId": "oktswap6",
 *     "ordId": "12345689",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradeCancelOrder = (
  params: TradeCancelOrderRequest
): Promise<TradeCancelOrderResponse[]> => {
  return request({
    url: '/api/v5/trade/cancel-order',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeCancelMultipleOrdersRequest {
  /** Instrument ID, e.g. BTC-USD-190927 */
  instId: string;

  /** Order ID  Either ordId or clOrdId is required. If both are passed, ordId will be used. */
  ordId?: string;

  /** Client-supplied order ID */
  clOrdId?: string;
}

export interface TradeCancelMultipleOrdersResponse {
  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Cancel Multiple Orders
 * Request Example:
 * POST /api/v5/trade/cancel-batch-orders
 * body
 * [
 *     {
 *         "instId":"BTC-USDT",
 *         "ordId":"12312"
 *     },
 *     {
 *         "instId":"BTC-USDT",
 *         "ordId":"1212"
 *     }
 * ]
 *
 * Response Example:
 * [
 *   {
 *     "clOrdId": "oktswap6",
 *     "ordId": "12345689",
 *     "sCode": "0",
 *     "sMsg": ""
 *   },
 *   {
 *     "clOrdId": "oktswap7",
 *     "ordId": "12344",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradeCancelMultipleOrders = (
  params: TradeCancelMultipleOrdersRequest[]
): Promise<TradeCancelMultipleOrdersResponse[]> => {
  return request({
    url: '/api/v5/trade/cancel-batch-orders',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeAmendOrderRequest {
  /** Instrument ID */
  instId: string;

  /** Whether the order needs to be automatically canceled when the order amendment fails false or true, the default is false. */
  cxlOnFail?: boolean;

  /** Order ID Either ordId or clOrdId is required. If both are passed, ordId will be used. */
  ordId?: string;

  /** Client-supplied order ID */
  clOrdId?: string;

  /** Client-supplied request IDA combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. */
  reqId?: string;

  /** New quantity after amendment. Either newSz or newPx is required. When amending a partially-filled order, the newSz should include the amount that has been filled. */
  newSz?: string;

  /** New price after amendment. */
  newPx?: string;
}

export interface TradeAmendOrderResponse {
  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** You can provide the request_id. If provided, the response will include the corresponding request_id to help you identify the request. */
  reqId: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Amend Order
 * Request Example:
 * POST /api/v5/trade/amend-order
 * body
 * {
 *     "ordId":"2510789768709120",
 *     "newSz":"2",
 *     "instId":"BTC-USDT"
 * }
 *
 * Response Example:
 * [
 *   {
 *     "clOrdId": "",
 *     "ordId": "12344",
 *     "reqId": "b12344",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradeAmendOrder = (
  params: TradeAmendOrderRequest
): Promise<TradeAmendOrderResponse[]> => {
  return request({
    url: '/api/v5/trade/amend-order',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeAmendMultipleOrdersRequest {
  /** Instrument ID */
  instId: string;

  /** Whether the order needs to be automatically canceled when the order amendment failsfalse  true, the default is false. */
  cxlOnFail?: boolean;

  /** Order IDEither ordId or clOrdIdis required, if both are passed, ordId will be used. */
  ordId?: string;

  /** Client-supplied order ID */
  clOrdId?: string;

  /** Client-supplied request IDA combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. */
  reqId?: string;

  /** New quantity after amendment. Either newSz or newPx is required. When amending a partially-filled order, the newSz should include the amount that has been filled. */
  newSz?: string;

  /** New price after amendment. */
  newPx?: string;
}

export interface TradeAmendMultipleOrdersResponse {
  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** You can provide the request_id. If provided, the response will include the corresponding request_id to help you identify the request. */
  reqId: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Amend Multiple Orders
 * Request Example:
 * POST /api/v5/trade/amend-batch-orders
 * body
 * [
 *     {
 *         "ordId":"2510789768709120",
 *         "newSz":"2",
 *         "instId":"BTC-USDT"
 *     },
 *     {
 *         "ordId":"2510789768709121",
 *         "newSz":"2",
 *         "instId":"BTC-USDT"
 *     }
 * ]
 *
 * Response Example:
 * [
 *   {
 *     "clOrdId": "oktswap6",
 *     "ordId": "12345689",
 *     "reqId": "b12344",
 *     "sCode": "0",
 *     "sMsg": ""
 *   },
 *   {
 *     "clOrdId": "oktswap7",
 *     "ordId": "12344",
 *     "reqId": "b12344",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradeAmendMultipleOrders = (
  params: TradeAmendMultipleOrdersRequest[]
): Promise<TradeAmendMultipleOrdersResponse[]> => {
  return request({
    url: '/api/v5/trade/amend-batch-orders',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeClosePositionsRequest {
  /** Instrument ID */
  instId: string;

  /** Position side This parameter can be omitted in net mode, and the default value is net. You can only fill with net.This parameter must be filled in under the long/short mode. Fill in long for close-long and short for close-short. */
  posSide?: string;

  /** Margin mode cross isolated */
  mgnMode: string;

  /** Margin currency, required in the case of closing cross MARGIN position for Single-currency margin. */
  ccy?: string;
}

export interface TradeClosePositionsResponse {
  /** Instrument ID */
  instId: string;

  /** Position side */
  posSide: string;
}

/** Close Positions
 * Request Example:
 * POST /api/v5/trade/close-position
 * body
 * {
 *     "instId":"BTC-USDT-SWAP",
 *     "mgnMode":"cross"
 * }
 *
 * Response Example:
 * [
 *   {
 *     "instId": "BTC-USDT-SWAP",
 *     "posSide": "long"
 *   }
 * ]
 */
export const TradeClosePositions = (
  params: TradeClosePositionsRequest
): Promise<TradeClosePositionsResponse[]> => {
  return request({
    url: '/api/v5/trade/close-position',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeGetOrderDetailsRequest {
  /** Instrument ID, e.g. BTC-USD-190927 */
  instId: string;

  /** Order IDEither ordId or clOrdId is required, if both are passed, ordId will be the main one */
  ordId?: string;

  /** Client-supplied order ID */
  clOrdId?: string;
}

export interface TradeGetOrderDetailsResponse {
  /** Instrument type SPOT MARGIN SWAP  FUTURES OPTION */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy: string;

  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Order tag */
  tag: string;

  /** Price */
  px: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Profit and loss */
  pnl: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType: string;

  /** Order side */
  side: string;

  /** Position side */
  posSide: string;

  /** Trade mode */
  tdMode: string;

  /** Accumulated fill quantity */
  accFillSz: string;

  /** Last filled price. If none is filled, it will return 0. */
  fillPx: string;

  /** Last traded ID */
  tradeId: string;

  /** Last filled quantity */
  fillSz: string;

  /** Last filled time */
  fillTime: string;

  /** Average filled price. If none is filled, it will return 0. */
  avgPx: string;

  /** State canceledlive partially_filledfilled */
  state: string;

  /** Leverage, from 0.01 to 125.Only applicable to MARGIN/FUTURES/SWAP */
  lever: string;

  /** Take-profit trigger price. It must be between 0 and 1,000,000. */
  tpTriggerPx: string;

  /** Take-profit order price. It must be between 0 and 1,000,000. */
  tpOrdPx: string;

  /** Stop-loss trigger price. It must be between 0 and 1,000,000. */
  slTriggerPx: string;

  /** Stop-loss order price. It must be between 0 and 1,000,000. */
  slOrdPx: string;

  /** Fee currency */
  feeCcy: string;

  /** Fee */
  fee: string;

  /** Rebate currency */
  rebateCcy: string;

  /** Rebate amount, the reward of placing orders from the platform (rebate) given to user who has reached the specified trading level. If there is no rebate, this field is "". */
  rebate: string;

  /** Categorynormaltwap adlfull_liquidationpartial_liquidation delivery：delivery */
  category: string;

  /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  uTime: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;
}

/** Get Order Details
 * Request Example:
 * GET /api/v5/trade/order?ordId=2510789768709120&instId=BTC-USDT
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ccy": "",
 *     "ordId": "312269865356374016",
 *     "clOrdId": "b1",
 *     "tag": "",
 *     "px": "999",
 *     "sz": "3",
 *     "pnl": "5",
 *     "ordType": "limit",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "isolated",
 *     "accFillSz": "0",
 *     "fillPx": "0",
 *     "tradeId": "0",
 *     "fillSz": "0",
 *     "fillTime": "0",
 *     "state": "live",
 *     "avgPx": "0",
 *     "lever": "20",
 *     "tpTriggerPx": "",
 *     "tpOrdPx": "",
 *     "slTriggerPx": "",
 *     "slOrdPx": "",
 *     "feeCcy": "",
 *     "fee": "",
 *     "rebateCcy": "",
 *     "rebate": "",
 *     "category": "",
 *     "uTime": "1597026383085",
 *     "cTime": "1597026383085"
 *   }
 * ]
 */
export const TradeGetOrderDetails = (
  params: TradeGetOrderDetailsRequest
): Promise<TradeGetOrderDetailsResponse[]> => {
  return request({
    url: '/api/v5/trade/order',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradeGetOrderListRequest {
  /** Instrument typeSPOTMARGIN SWAPFUTURESOPTION */
  instType?: string;

  /** Underlying */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-200927 */
  instId?: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  Optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType?: string;

  /** State live  partially_filled */
  state?: string;

  /** Pagination of data to return records earlier than the requested ordId */
  after?: string;

  /** Pagination of data to return records newer than the requested ordId */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface TradeGetOrderListResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy: string;

  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Order tag */
  tag: string;

  /** Price */
  px: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Profit and loss */
  pnl: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType: string;

  /** Order side */
  side: string;

  /** Position side */
  posSide: string;

  /** Trade mode */
  tdMode: string;

  /** Accumulated fill quantity */
  accFillSz: string;

  /** Last filled price */
  fillPx: string;

  /** Last trade ID */
  tradeId: string;

  /** Last filled quantity */
  fillSz: string;

  /** Last filled time */
  fillTime: string;

  /** Average filled price. If none is filled, it will return 0. */
  avgPx: string;

  /** Statelive partially_filled */
  state: string;

  /** Leverage, from 0.01 to 125.Only applicable to MARGIN/FUTURES/SWAP */
  lever: string;

  /** Take-profit trigger price. It must be between 0 and 1,000,000. */
  tpTriggerPx: string;

  /** Take-profit order price. It must be between 0 and 1,000,000. */
  tpOrdPx: string;

  /** Stop-loss trigger price. It must be between 0 and 1,000,000. */
  slTriggerPx: string;

  /** Stop-loss order price. It must be between 0 and 1,000,000. */
  slOrdPx: string;

  /** Fee currency */
  feeCcy: string;

  /** Fee */
  fee: string;

  /** Rebate currency */
  rebateCcy: string;

  /** Rebate amount, the reward of placing orders from the platform (rebate) given to user who has reached the specified trading level. If there is no rebate, this field is "". */
  rebate: string;

  /** Category normal */
  category: string;

  /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  uTime: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;
}

/** Get Order List
 * Request Example:
 * GET /api/v5/trade/orders-pending?ordType=post_only,fok,ioc&instType=SPOT
 *
 *
 * Response Example:
 * [
 *   {
 *     "accFillSz": "0",
 *     "avgPx": "",
 *     "cTime": "1618235248028",
 *     "category": "normal",
 *     "ccy": "",
 *     "clOrdId": "",
 *     "fee": "0",
 *     "feeCcy": "BTC",
 *     "fillPx": "",
 *     "fillSz": "0",
 *     "fillTime": "",
 *     "instId": "BTC-USDT",
 *     "instType": "SPOT",
 *     "lever": "5.6",
 *     "ordId": "301835739059335168",
 *     "ordType": "limit",
 *     "pnl": "0",
 *     "posSide": "net",
 *     "px": "59200",
 *     "rebate": "0",
 *     "rebateCcy": "USDT",
 *     "side": "buy",
 *     "slOrdPx": "",
 *     "slTriggerPx": "",
 *     "state": "live",
 *     "sz": "1",
 *     "tag": "",
 *     "tdMode": "cross",
 *     "tpOrdPx": "",
 *     "tpTriggerPx": "",
 *     "tradeId": "",
 *     "uTime": "1618235248028"
 *   }
 * ]
 */
export const TradeGetOrderList = (
  params: TradeGetOrderListRequest
): Promise<TradeGetOrderListResponse[]> => {
  return request({
    url: '/api/v5/trade/orders-pending',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradeGetOrderHistoryLast7DaysRequest {
  /** Instrument typeSPOTMARGIN SWAPFUTURESOPTION */
  instType: string;

  /** Underlying */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-190927 */
  instId?: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType?: string;

  /** Statecanceledfilled */
  state?: string;

  /** Category twap adlfull_liquidationpartial_liquidation  delivery */
  category?: string;

  /** Pagination of data to return records earlier than the requested ordId */
  after?: string;

  /** Pagination of data to return records newer than the requested ordId */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface TradeGetOrderHistoryLast7DaysResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy: string;

  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Order tag */
  tag: string;

  /** Price */
  px: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType: string;

  /** Order side */
  side: string;

  /** Position side */
  posSide: string;

  /** Trade mode */
  tdMode: string;

  /** Accumulated fill quantity */
  accFillSz: string;

  /** Last filled price. If none is filled, it will return 0. */
  fillPx: string;

  /** Last trade ID */
  tradeId: string;

  /** Last filled quantity */
  fillSz: string;

  /** Last filled time */
  fillTime: string;

  /** Average filled price. If none is filled, it will return 0. */
  avgPx: string;

  /** State  canceled  filled */
  state: string;

  /** Leverage, from 0.01 to 125.Only applicable to MARGIN/FUTURES/SWAP */
  lever: string;

  /** Take-profit trigger price. It must be between 0 and 1,000,000. */
  tpTriggerPx: string;

  /** Take-profit order price. It must be between 0 and 1,000,000. */
  tpOrdPx: string;

  /** Stop-loss trigger price. It must be between 0 and 1,000,000. */
  slTriggerPx: string;

  /** Stop-loss order price. It must be between 0 and 1,000,000. */
  slOrdPx: string;

  /** Fee currency */
  feeCcy: string;

  /** Fee */
  fee: string;

  /** Rebate currency */
  rebateCcy: string;

  /** Rebate amount, the reward of placing orders from the platform (rebate) given to user who has reached the specified trading level. If there is no rebate, this field is "". */
  rebate: string;

  /** Profit and loss */
  pnl: string;

  /** Category normaltwap adlfull_liquidationpartial_liquidation    delivery */
  category: string;

  /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  uTime: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;
}

/** Get Order History (last 7 days）
 * Request Example:
 * GET /api/v5/trade/orders-history?ordType=post_only,fok,ioc&instType=SPOT
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ccy": "",
 *     "ordId": "312269865356374016",
 *     "clOrdId": "b1",
 *     "tag": "",
 *     "px": "999",
 *     "sz": "3",
 *     "ordType": "limit",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "isolated",
 *     "accFillSz": "0",
 *     "fillPx": "0",
 *     "tradeId": "0",
 *     "fillSz": "0",
 *     "fillTime": "0",
 *     "state": "live",
 *     "avgPx": "0",
 *     "lever": "20",
 *     "tpTriggerPx": "",
 *     "tpOrdPx": "",
 *     "slTriggerPx": "",
 *     "slOrdPx": "",
 *     "feeCcy": "",
 *     "fee": "",
 *     "rebateCcy": "",
 *     "rebate": "",
 *     "pnl": "",
 *     "category": "",
 *     "uTime": "1597026383085",
 *     "cTime": "1597026383085"
 *   }
 * ]
 */
export const TradeGetOrderHistoryLast7Days = (
  params: TradeGetOrderHistoryLast7DaysRequest
): Promise<TradeGetOrderHistoryLast7DaysResponse[]> => {
  return request({
    url: '/api/v5/trade/orders-history',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradeGetOrderHistoryLast3MonthsRequest {
  /** Instrument typeSPOTMARGIN SWAPFUTURESOPTION */
  instType: string;

  /** Underlying */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-200927 */
  instId?: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType?: string;

  /** State canceled  filled */
  state?: string;

  /** Category twap adlfull_liquidationpartial_liquidation delivery */
  category?: string;

  /** Pagination of data to return records earlier than the requested ordId */
  after?: string;

  /** Pagination of data to return records newer than the requested ordId */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface TradeGetOrderHistoryLast3MonthsResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy: string;

  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Order tag */
  tag: string;

  /** Price */
  px: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Order typemarket: market orderlimit: limit orderpost_only: Post-only orderfok: Fill-or-kill orderioc: Immediate-or-cancel order  optimal_limit_ioc :Market order with immediate-or-cancel order */
  ordType: string;

  /** Order side */
  side: string;

  /** Position side */
  posSide: string;

  /** Trade mode */
  tdMode: string;

  /** Accumulated fill quantity */
  accFillSz: string;

  /** Last filled price. If none is filled, it will return 0. */
  fillPx: string;

  /** Last trade ID */
  tradeId: string;

  /** Last filled quantity */
  fillSz: string;

  /** Last filled time */
  fillTime: string;

  /** Average filled price. If none is filled, it will returns 0. */
  avgPx: string;

  /** State canceled filled */
  state: string;

  /** Leverage, from 0.01 to 125.Only applicable to MARGIN/FUTURES/SWAP */
  lever: string;

  /** Take-profit trigger price. It must be between 0 and 1,000,000. */
  tpTriggerPx: string;

  /** Take-profit order price. It must be between 0 and 1,000,000. */
  tpOrdPx: string;

  /** Stop-loss trigger price. It must be between 0 and 1,000,000. */
  slTriggerPx: string;

  /** Stop-loss order price. It must be between 0 and 1,000,000. */
  slOrdPx: string;

  /** Fee currency */
  feeCcy: string;

  /** Fee */
  fee: string;

  /** Rebate currency */
  rebateCcy: string;

  /** Rebate amount, the reward of placing orders from the platform (rebate) given to user who has reached the specified trading level. If there is no rebate, this field is "". */
  rebate: string;

  /** Profit and loss */
  pnl: string;

  /** Category normaltwap adlfull_liquidationpartial_liquidation  delivery */
  category: string;

  /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  uTime: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;
}

/** Get Order History (last 3 months)
 * Request Example:
 * GET /api/v5/trade/orders-history-archive?ordType=post_only,fok,ioc&instType=SPOT
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ccy": "",
 *     "ordId": "312269865356374016",
 *     "clOrdId": "b1",
 *     "tag": "",
 *     "px": "999",
 *     "sz": "3",
 *     "ordType": "limit",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "isolated",
 *     "accFillSz": "0",
 *     "fillPx": "0",
 *     "tradeId": "0",
 *     "fillSz": "0",
 *     "fillTime": "0",
 *     "state": "live",
 *     "avgPx": "0",
 *     "lever": "20",
 *     "tpTriggerPx": "",
 *     "tpOrdPx": "",
 *     "slTriggerPx": "",
 *     "slOrdPx": "",
 *     "feeCcy": "",
 *     "fee": "",
 *     "rebateCcy": "",
 *     "rebate": "",
 *     "pnl": "",
 *     "category": "",
 *     "uTime": "1597026383085",
 *     "cTime": "1597026383085"
 *   }
 * ]
 */
export const TradeGetOrderHistoryLast3Months = (
  params: TradeGetOrderHistoryLast3MonthsRequest
): Promise<TradeGetOrderHistoryLast3MonthsResponse[]> => {
  return request({
    url: '/api/v5/trade/orders-history-archive',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradeGetTransactionDetailsRequest {
  /** Instrument typeSPOTMARGINSWAP FUTURESOPTION */
  instType?: string;

  /** Underlying */
  uly?: string;

  /** Instrument ID, e.g. BTC-USD-190927 */
  instId?: string;

  /** Order ID */
  ordId?: string;

  /** Pagination of data to return records earlier than the requested billId */
  after?: string;

  /** Pagination of data to return records newer than the requested billId */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface TradeGetTransactionDetailsResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Last trade ID */
  tradeId: string;

  /** Order ID */
  ordId: string;

  /** Client-supplied order ID */
  clOrdId: string;

  /** Bill ID */
  billId: string;

  /** Order tag */
  tag: string;

  /** Last filled price */
  fillPx: string;

  /** Last filled quantity */
  fillSz: string;

  /** Order side,  buy  sell */
  side: string;

  /** Position sidelong  short  it returns net innet mode. */
  posSide: string;

  /** Order flow type, T: taker  M: maker */
  execType: string;

  /** Fee currency */
  feeCcy: string;

  /** Fee */
  fee: string;

  /** Data generation time,  Unix timestamp format in milliseconds, e.g. 1597026383085. */
  ts: string;
}

/** Get Transaction Details
 * Request Example:
 * GET /api/v5/trade/fills
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "tradeId": "123",
 *     "ordId": "123445",
 *     "clOrdId": "b16",
 *     "billId": "1111",
 *     "tag": "",
 *     "fillPx": "999",
 *     "fillSz": "3",
 *     "side": "buy",
 *     "posSide": "long",
 *     "execType": "M",
 *     "feeCcy": "",
 *     "fee": "",
 *     "ts": "1597026383085"
 *   },
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "tradeId": "123",
 *     "ordId": "123445",
 *     "clOrdId": "b16",
 *     "billId": "1111",
 *     "tag": "",
 *     "fillPx": "999",
 *     "fillSz": "3",
 *     "side": "buy",
 *     "posSide": "long",
 *     "execType": "M",
 *     "feeCcy": "",
 *     "fee": "",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const TradeGetTransactionDetails = (
  params: TradeGetTransactionDetailsRequest
): Promise<TradeGetTransactionDetailsResponse[]> => {
  return request({
    url: '/api/v5/trade/fills',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradePlaceAlgoOrderRequest {
  /** Instrument ID, e.g. BTC-USD-190927-5000-C */
  instId: string;

  /** Trade modeMargin mode cross isolatedNon-Margin mode cash */
  tdMode: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy?: string;

  /** Order side, buy sell */
  side: string;

  /** Position sideRequired in long/short mode and only be long or short */
  posSide?: string;

  /** Order type conditional: One-way stop order oco: One-cancels-the-other ordertrigger: Trigger order */
  ordType: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Whether reduce position only or not, true false */
  reduceOnly?: boolean;
}

export interface TradePlaceAlgoOrderResponse {
  /** Algo ID */
  algoId: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Place Algo Order
 * Request Example:
 * POST /api/v5/trade/order-algo
 * body
 * {
 *     "instId":"BTC-USDT",
 *     "tdMode":"cross",
 *     "side":"buy",
 *     "ordType":"conditional",
 *     "sz":"2",
 *     "tpTriggerPx":"15",
 *     "tpOrdPx":"18"
 * }
 *
 *
 * Response Example:
 * [
 *   {
 *     "algoId": "12345689",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradePlaceAlgoOrder = (
  params: TradePlaceAlgoOrderRequest
): Promise<TradePlaceAlgoOrderResponse[]> => {
  return request({
    url: '/api/v5/trade/order-algo',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeCancelAlgoOrderRequest {
  /** Algo ID */
  algoId: string;

  /** Instrument ID, e.g. BTC-USDT */
  instId: string;
}

export interface TradeCancelAlgoOrderResponse {
  /** Order ID */
  algoId: string;

  /** The code of the event execution result, 0 means success. */
  sCode: string;

  /** Message shown when the event execution fails. */
  sMsg: string;
}

/** Cancel Algo Order
 * Request Example:
 * POST /api/v5/trade/cancel-algos
 * body
 * [
 *     {
 *         "algoId":"198273485",
 *         "instId":"BTC-USDT"
 *     },
 *     {
 *         "algoId":"198273485",
 *         "instId":"BTC-USDT"
 *     }
 * ]
 *
 * Response Example:
 * [
 *   {
 *     "algoId": "1234",
 *     "sCode": "0",
 *     "sMsg": ""
 *   }
 * ]
 */
export const TradeCancelAlgoOrder = (
  params: TradeCancelAlgoOrderRequest[]
): Promise<TradeCancelAlgoOrderResponse[]> => {
  return request({
    url: '/api/v5/trade/cancel-algos',
    method: 'POST',
    data: params,
    paramsIn: 'body'
  });
};

export interface TradeGetAlgoOrderListRequest {
  /** Algo ID */
  algoId?: string;

  /** Instrument typeSPOTSWAP FUTURESMARFIN */
  instType?: string;

  /** Instrument ID, e.g. BTC-USD-190927 */
  instId?: string;

  /** Order type conditional: One-way stop order oco: One-cancels-the-other ordertrigger: Trigger order */
  ordType: string;

  /** Pagination of data to return records earlier than the requested algoId. */
  after?: string;

  /** Pagination of data to return records newer than the requested algoId. */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface TradeGetAlgoOrderListResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy: string;

  /** Order ID */
  ordId: string;

  /** Algo ID */
  algoId: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Order type conditional: One-way stop order oco: One-cancels-the-other ordertrigger: Trigger order */
  ordType: string;

  /** Order side */
  side: string;

  /** Position side */
  posSide: string;

  /** Trade mode */
  tdMode: string;

  /** State,live */
  state: string;

  /** Leverage, from 0.01 to 125.Only applicable to MARGIN/FUTURES/SWAP */
  lever: string;

  /** Take-profit trigger price, it must be between 0 and 1,000,000. */
  tpTriggerPx: string;

  /** Take-profit order price, it must be between 0 and 1,000,000. */
  tpOrdPx: string;

  /** Stop-loss trigger price, it must be between 0 and 1,000,000. */
  slTriggerPx: string;

  /** Stop-loss order price, it must be between 0 and 1,000,000. */
  slOrdPx: string;

  /** Trigger price */
  triggerPx: string;

  /** Order price */
  ordPx: string;

  /** Actual order quantity */
  actualSz: string;

  /** Actual order price */
  actualPx: string;

  /** Actual trigger side, tp: take profit sl: stop loss */
  actualSide: string;

  /** Trigger time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  triggerTime: string;

  /** Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;
}

/** Get Algo Order List
 * Request Example:
 * GET /api/v5/trade/orders-algo-pending?ordType=conditional
 *
 *
 * Response Example:
 * [
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ordId": "312269865356374016",
 *     "ccy": "BTC",
 *     "algoId": "1234",
 *     "sz": "999",
 *     "ordType": "oco",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "cross",
 *     "state": "1",
 *     "lever": "20",
 *     "tpTriggerPx": "",
 *     "tpOrdPx": "",
 *     "slTriggerPx": "",
 *     "triggerPx": "99",
 *     "ordPx": "12",
 *     "actualSz": "",
 *     "actualPx": "",
 *     "actualSide": "",
 *     "triggerTime": "1597026383085",
 *     "cTime": "1597026383000"
 *   },
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ordId": "312269865356374016",
 *     "ccy": "BTC",
 *     "algoId": "1234",
 *     "sz": "999",
 *     "ordType": "oco",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "cross",
 *     "state": "1",
 *     "lever": "20",
 *     "tpTriggerPx": "",
 *     "tpOrdPx": "",
 *     "slTriggerPx": "",
 *     "triggerPx": "99",
 *     "ordPx": "12",
 *     "actualSz": "",
 *     "actualPx": "",
 *     "actualSide": "",
 *     "triggerTime": "1597026383085",
 *     "cTime": "1597026383000"
 *   }
 * ]
 */
export const TradeGetAlgoOrderList = (
  params: TradeGetAlgoOrderListRequest
): Promise<TradeGetAlgoOrderListResponse[]> => {
  return request({
    url: '/api/v5/trade/orders-algo-pending',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface TradeGetAlgoOrderHistoryRequest {
  /** Stateeffectivecanceledorder_failedEither state or algoId is requied */
  state?: string;

  /** Algo IDEither state or algoId is required. */
  algoId?: string;

  /** Instrument typeSPOTSWAP FUTURESMARGIN */
  instType?: string;

  /** Instrument ID, e.g. BTC-USD-190927 */
  instId?: string;

  /** Order type conditional: One-way stop order oco: One-cancels-the-other ordertrigger: Trigger order */
  ordType: string;

  /** Pagination of data to return records earlier than the requested algoId */
  after?: string;

  /** Pagination of data to return records new than the requested algoId */
  before?: string;

  /** Number of results per request. The maximum is 100; The default is 100 */
  limit?: string;
}

export interface TradeGetAlgoOrderHistoryResponse {
  /** Instrument type */
  instType: string;

  /** Instrument ID */
  instId: string;

  /** Margin currencyOnly applicable to cross MARGIN orders in Single-currency margin. */
  ccy: string;

  /** Order ID */
  ordId: string;

  /** Algo ID */
  algoId: string;

  /** Quantity to buy or sell */
  sz: string;

  /** Order type conditional: One-way stop order oco: One-cancels-the-other ordertrigger: Trigger order */
  ordType: string;

  /** Order side */
  side: string;

  /** Position side */
  posSide: string;

  /** Trade mode */
  tdMode: string;

  /** State effective canceled order_failed */
  state: string;

  /** Leverage, from 0.01 to 125.Only applicable to MARGIN/FUTURES/SWAP */
  lever: string;

  /** Take-profit trigger price. It must be between 0 and 1,000,000. */
  tpTriggerPx: string;

  /** Take-profit order price. It must be between 0 and 1,000,000. */
  tpOrdPx: string;

  /** Stop-loss trigger price. It must be between 0 and 1,000,000. */
  slTriggerPx: string;

  /** Stop-loss order price. It must be between 0 and 1,000,000. */
  slOrdPx: string;

  /** Order price */
  ordPx: string;

  /** Actual order quantity */
  actualSz: string;

  /** Actual order price */
  actualPx: string;

  /** Actual trigger side, tp: take profit sl: stop loss */
  actualSide: string;

  /** Trigger time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
  triggerTime: string;

  /** Creation time Unix timestamp format in milliseconds, e.g. 1597026383085 */
  cTime: string;
}

/** Get Algo Order History
 * Request Example:
 * GET /api/v5/trade/orders-algo-history?state=effective&ordType=conditional
 *
 * Response Example:
 * [
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ordId": "312269865356374016",
 *     "ccy": "BTC",
 *     "algoId": "1234",
 *     "sz": "999",
 *     "ordType": "oco",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "cross",
 *     "state": "effective",
 *     "lever": "20",
 *     "tpRequired in `long/short` mode, and": "",
 *     "tpOrdPx": "",
 *     "slRequired in `long/short` mode, and": "",
 *     "Required in `long/short` mode, and": "99",
 *     "ordPx": "12",
 *     "actualSz": "",
 *     "actualPx": "",
 *     "actualSide": "",
 *     "triggerTime": "1597026383085",
 *     "cTime": "1597026383000"
 *   },
 *   {
 *     "instType": "FUTURES",
 *     "instId": "BTC-USD-200329",
 *     "ordId": "312269865356374016",
 *     "ccy": "BTC",
 *     "algoId": "1234",
 *     "sz": "999",
 *     "ordType": "oco",
 *     "side": "buy",
 *     "posSide": "long",
 *     "tdMode": "cross",
 *     "state": "effective",
 *     "lever": "20",
 *     "tpRequired in `long/short` mode, and": "",
 *     "tpOrdPx": "",
 *     "slRequired in `long/short` mode, and": "",
 *     "Required in `long/short` mode, and": "99",
 *     "ordPx": "12",
 *     "actualSz": "",
 *     "actualPx": "",
 *     "actualSide": "",
 *     "triggerTime": "1597026383085",
 *     "cTime": "1597026383000"
 *   }
 * ]
 */
export const TradeGetAlgoOrderHistory = (
  params: TradeGetAlgoOrderHistoryRequest
): Promise<TradeGetAlgoOrderHistoryResponse[]> => {
  return request({
    url: '/api/v5/trade/orders-algo-history',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface SubAccountViewSubAccountListRequest {
  /** Sub-account status，true: Normal  ; false: Frozen */
  enable?: string;

  /** Sub-account name */
  subAcct?: string;

  /** If you query the data prior to the requested creation time ID, the value will be a Unix timestamp in millisecond format. */
  after?: string;

  /** If you query the data after the requested creation time ID, the value will be a Unix timestamp in millisecond format. */
  before?: string;

  /** Number of results per request. The maximum is 100. The default is 100. */
  limit?: string;
}

export interface SubAccountViewSubAccountListResponse {
  /** Sub-account status true: Normal  ; false:Frozen */
  enable: string;

  /** Sub-account name */
  subAcct: string;

  /** Sub-account note */
  label: string;

  /** Mobile number that linked with the sub-account. */
  mobile: string;

  /** If the sub-account switches on the Google Authenticator for login authentication. true: On  ; false: Off */
  gAuth: string;

  /** Sub-account creation time with Unix timestamp in millisecond format. e.g., 1597026383085 */
  ts: string;
}

/** View sub-account list
 * Request Example:
 * GET /api/v5/users/subaccount/list
 *
 *
 * Response Example:
 * [
 *   {
 *     "enable": true,
 *     "subAcct": "test-1",
 *     "label": "trade futures",
 *     "mobile": "1818181",
 *     "gAuth": true,
 *     "ts": "1597026383085"
 *   },
 *   {
 *     "enable": false,
 *     "subAcct": "test-2",
 *     "label": "trade spot",
 *     "mobile": "1818199",
 *     "gAuth": true,
 *     "ts": "1597026383082"
 *   }
 * ]
 */
export const SubAccountViewSubAccountList = (
  params: SubAccountViewSubAccountListRequest
): Promise<SubAccountViewSubAccountListResponse[]> => {
  return request({
    url: '/api/v5/users/subaccount/list',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface SubAccountCreateAnApikeyForASubAccountRequest {
  /** Funding password of the master account */
  pwd: string;

  /** Sub-account name */
  subAcct: string;

  /** APIKey note */
  label: string;

  /** APIKey password， supports 6 to 32 characters that include numbers and letters (case sensitive, space symbol is not supported). */
  Passphrase: string;

  /** APIKey access  read_only: Read only trade: Trade */
  perm?: string;

  /** Link IP addresses, separate with commas if more than one. Support up to 5 addresses. */
  ip?: string;
}

export interface SubAccountCreateAnApikeyForASubAccountResponse {
  /** Sub-account name */
  subAcct: string;

  /** APIKey note */
  label: string;

  /** API public key */
  apiKey: string;

  /** API private key */
  secretKey: string;

  /** APIKey password */
  Passphrase: string;

  /** APIKey access  read_only : Read only  trade : Trade */
  perm: string;

  /** IP address that linked with APIKey */
  ip: string;

  /** Creation time */
  ts: string;
}

/** Create an APIKey for a sub-account
 * Request Example:
 * POST /api/v5/users/subaccount/apikey
 *
 * Response Example:
 * [
 *   {
 *     "subAcct": "test-1",
 *     "label": "v5",
 *     "apiKey": "arg13sdfgs",
 *     "secretKey": "arg13sdfgs",
 *     "passphrase": "123678",
 *     "perm": "read_only,trade",
 *     "ip": "1.1.1.1,2.2.2.2",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const SubAccountCreateAnApikeyForASubAccount = (
  params: SubAccountCreateAnApikeyForASubAccountRequest
): Promise<SubAccountCreateAnApikeyForASubAccountResponse[]> => {
  return request({
    url: '/api/v5/users/subaccount/apikey',
    method: 'POST',
    data: params,
    paramsIn: 'query'
  });
};

export interface SubAccountResetTheApikeyOfASubAccountRequest {
  /** Funds password of the master account */
  pwd: string;

  /** Sub-account name */
  subAcct: string;

  /** APIKey note */
  label: string;

  /** APIKey note */
  apiKey: string;

  /** APIKey access  read_only : Read only trade : Trade */
  perm: string;

  /** Link IP addresses,  separate with commas if more than one. Support up to 20 IP addresses. */
  ip?: string;
}

export interface SubAccountResetTheApikeyOfASubAccountResponse {
  /** Sub-account name */
  subAcct: string;

  /** APIKey note */
  label: string;

  /** API public key */
  apiKey: string;

  /** APIKey access  read_only：Read only   ；trade ：Trade */
  perm: string;

  /** IP address that linked with APIKey */
  ip: string;

  /** Creation time */
  ts: string;
}

/** Reset the APIKey of a sub-account
 * Request Example:
 * POST /api/v5/users/subaccount/modify-apikey
 *
 * Response Example:
 * [
 *   {
 *     "subAcct": "test-1",
 *     "subUid": "99999",
 *     "label": "v5",
 *     "apiKey": "arg13sdfgs",
 *     "perm": "read,trade",
 *     "ip": "1.1.1.1,2.2.2.2",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const SubAccountResetTheApikeyOfASubAccount = (
  params: SubAccountResetTheApikeyOfASubAccountRequest
): Promise<SubAccountResetTheApikeyOfASubAccountResponse[]> => {
  return request({
    url: '/api/v5/users/subaccount/modify-apikey',
    method: 'POST',
    data: params,
    paramsIn: 'query'
  });
};

export interface SubAccountDeleteTheApikeyOfSubAccountsRequest {
  /** Funds password of the master account */
  pwd: string;

  /** Sub-account name */
  subAcct: string;

  /** API public key */
  apiKey: string;
}

export interface SubAccountDeleteTheApikeyOfSubAccountsResponse {
  /** Sub-account name */
  subAcct: string;
}

/** Delete the APIKey of sub-accounts
 * Request Example:
 * POST /api/v5/users/subaccount/delete-apikey
 *
 * Response Example:
 * [
 *   {
 *     "subAcct": "test-1"
 *   }
 * ]
 */
export const SubAccountDeleteTheApikeyOfSubAccounts = (
  params: SubAccountDeleteTheApikeyOfSubAccountsRequest
): Promise<SubAccountDeleteTheApikeyOfSubAccountsResponse[]> => {
  return request({
    url: '/api/v5/users/subaccount/delete-apikey',
    method: 'POST',
    data: params,
    paramsIn: 'query'
  });
};

export interface SubAccountQueryDetailedBalanceInfoOfTradingAccountOfASubAccountRequest {
  /** Sub-account name */
  subAcct: string;
}

export interface SubAccountQueryDetailedBalanceInfoOfTradingAccountOfASubAccountResponse {
  /** The latest time to get account information, millisecond format of Unix timestamp, e.g. 1597026383085 */
  uTime: string;

  /** Total equity in USD level */
  totalEq: string;

  /** Isolated margin equity in USD levelApplicable to Single-currency margin and Multi-currency margin */
  isoEq: string;

  /** Adjusted/Effective equity in USD levelApplicable to Multi-currency margin */
  adjEq: string;

  /** Margin frozen for pending orders in USD levelApplicable to Multi-currency margin */
  ordFroz: string;

  /** Initial margin requirement in USD levelApplicable to Multi-currency margin */
  imr: string;

  /** Maintenance margin requirement in USD level Applicable to Multi-currency margin */
  mmr: string;

  /** Margin ratio in USD level Applicable to Multi-currency margin */
  mgnRatio: string;

  /** Quantity of positions usd Applicable to Multi-currency margin */
  notionalUsd: string;

  /** Detailed asset information in all currencies */
  details: {
    /** Currency */
    ccy: string;

    /** Equity of the currency */
    eq: string;

    /** Cash Balance */
    cashBal: string;

    /** Update time, Unix timestamp format in milliseconds, e.g. 1597026383085 */
    uTime: string;

    /** Isolated margin equity of the currencyApplicable to Single-currency margin and Multi-currency margin */
    isoEq: string;

    /** Available equity of the currencyApplicable to Single-currency margin and Multi-currency margin */
    availEq: string;

    /** discount equity of the currency in USD level */
    disEq: string;

    /** Available balance of the currencyApplicable to Simple */
    availBal: string;

    /** Frozen balance of the currency */
    frozenBal: string;

    /** Margin frozen for open orders */
    ordFrozen: string;

    /** Liabilities of the currencyApplicable to Multi-currency margin */
    liab: string;

    /** Unrealized profit and loss of the currencyApplicable to Single-currency margin and Multi-currency margin */
    upl: string;

    /** Liabilities due to Unrealized loss of the currencyApplicable to Multi-currency margin */
    uplLib: string;

    /** Cross Liabilities of the currencyApplicable to Multi-currency margin */
    crossLiab: string;

    /** Isolated Liabilities of the currencyApplicable to Multi-currency margin */
    isoLiab: string;

    /** Margin ratio of the currencyApplicable to Single-currency margin */
    mgnRatio: string;

    /** Interest of the currencyApplicable to Multi-currency margin */
    interest: string;

    /** System's forced repayment(TWAP) indicatorDivided into 5 levels, from 1 to 5, the smaller the number, the weaker the TWAP intensity. Applicable to Multi-currency margin */
    twap: string;

    /** Max loan of the currencyApplicable to Multi-currency margin */
    maxLoan: string;

    /** Equity usd of the currency */
    eqUsd: string;

    /** Leverage of the currency */
    notionalLever: string;
  }[];
}

/** Query detailed balance info of Trading Account of a sub-account
 * Request Example:
 * GET /api/v5/account/subaccount/balances?subAcct=test1
 *
 *
 * Response Example:
 * [
 *   {
 *     "adjEq": "",
 *     "imr": "",
 *     "isoEq": "0",
 *     "mgnRatio": "",
 *     "mmr": "",
 *     "notionalUsd": "",
 *     "ordFroz": "",
 *     "totalEq": "119839.7127045272353964",
 *     "uTime": "1620273482639",
 *     "details": [
 *       {
 *         "availBal": "",
 *         "availEq": "1.8514774483",
 *         "cashBal": "1.8514774483",
 *         "ccy": "BTC",
 *         "crossLiab": "",
 *         "disEq": "105356.343114641819",
 *         "eq": "1.8514774483",
 *         "eqUsd": "45078.3790756226851775",
 *         "frozenBal": "0",
 *         "interest": "",
 *         "isoEq": "0",
 *         "isoLiab": "",
 *         "liab": "",
 *         "maxLoan": "",
 *         "mgnRatio": "",
 *         "notionalLever": "0.0022195262185864",
 *         "ordFrozen": "0",
 *         "twap": "0",
 *         "uTime": "1620273224683",
 *         "upl": "0",
 *         "uplLiab": ""
 *       },
 *       {
 *         "availBal": "",
 *         "availEq": "10690.52977822647",
 *         "cashBal": "10690.52977822647",
 *         "ccy": "USDT",
 *         "crossLiab": "",
 *         "disEq": "10702.5031715780836464",
 *         "eq": "10690.52977822647",
 *         "eqUsd": "45078.3790756226851775",
 *         "frozenBal": "0",
 *         "interest": "",
 *         "isoEq": "0",
 *         "isoLiab": "",
 *         "liab": "",
 *         "maxLoan": "",
 *         "mgnRatio": "",
 *         "notionalLever": "0.0022195262185864",
 *         "ordFrozen": "0",
 *         "twap": "0",
 *         "uTime": "1620273217428",
 *         "upl": "0",
 *         "uplLiab": ""
 *       },
 *       {
 *         "availBal": "",
 *         "availEq": "3819.056988189225",
 *         "cashBal": "3819.056988189225",
 *         "ccy": "USDK",
 *         "crossLiab": "",
 *         "disEq": "3780.86641830733275",
 *         "eq": "3819.056988189225",
 *         "eqUsd": "45078.3790756226851775",
 *         "frozenBal": "0",
 *         "interest": "",
 *         "isoEq": "0",
 *         "isoLiab": "",
 *         "liab": "",
 *         "maxLoan": "",
 *         "mgnRatio": "",
 *         "notionalLever": "0.0022195262185864",
 *         "ordFrozen": "0",
 *         "twap": "0",
 *         "uTime": "1620273209154",
 *         "upl": "0",
 *         "uplLiab": ""
 *       }
 *     ]
 *   }
 * ]
 */
export const SubAccountQueryDetailedBalanceInfoOfTradingAccountOfASubAccount = (
  params: SubAccountQueryDetailedBalanceInfoOfTradingAccountOfASubAccountRequest
): Promise<SubAccountQueryDetailedBalanceInfoOfTradingAccountOfASubAccountResponse[]> => {
  return request({
    url: '/api/v5/account/subaccount/balances',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};

export interface SubAccountHistoryOfSubAccountTransferRequest {
  /** Currency, such as BTC */
  ccy?: string;

  /** 0: Transfers from master account to sub-account ;1 : Transfers from sub-account to master account. */
  type?: string;

  /** Sub-account name */
  subAcct?: string;

  /** If you query the data prior to the requested bill ID, the value will be a Unix timestamp in millisecond format. */
  after?: string;

  /** If you query the data after the requested bill ID, the value will be a Unix timestamp in millisecond format. */
  before?: string;

  /** Number of results per request. The maximum is 100. The default is 100. */
  limit?: string;
}

export interface SubAccountHistoryOfSubAccountTransferResponse {
  /** Bill ID */
  billId: string;

  /** Account balance currency */
  ccy: string;

  /** Transfer amount */
  amt: string;

  /** Bill type */
  type: string;

  /** Sub-account name */
  subAcct: string;

  /** Sub-account creation time with Unix timestamp in millisecond format,1597026383085  e.g., 1597026383085 */
  ts: string;
}

/** History of sub-account transfer
 * Request Example:
 * GET /api/v5/asset/subaccount/bills
 *
 * Response Example:
 * [
 *   {
 *     "billId": "12344",
 *     "type": "1",
 *     "ccy": "BTC",
 *     "amt": "2",
 *     "subAcct": "test-1",
 *     "ts": "1597026383085"
 *   }
 * ]
 */
export const SubAccountHistoryOfSubAccountTransfer = (
  params: SubAccountHistoryOfSubAccountTransferRequest
): Promise<SubAccountHistoryOfSubAccountTransferResponse[]> => {
  return request({
    url: '/api/v5/asset/subaccount/bills',
    method: 'GET',
    data: params,
    paramsIn: 'query'
  });
};
