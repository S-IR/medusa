import { FindConfig } from "../common"
import { ModuleJoinerConfig } from "../modules-sdk"
import { Context } from "../shared-context"
import {
  CalculatedPriceSetDTO,
  CreateCurrencyDTO,
  CreateMoneyAmountDTO,
<<<<<<< HEAD
  CreatePriceSetDTO,
  CurrencyDTO,
  FilterableCurrencyProps,
  FilterableMoneyAmountProps,
  FilterablePriceSetProps,
  MoneyAmountDTO,
  PriceSetDTO,
  PricingContext,
  UpdateCurrencyDTO,
  UpdateMoneyAmountDTO,
  UpdatePriceSetDTO,
=======
  CreatePriceListDTO,
  CurrencyDTO,
  FilterableCurrencyProps,
  FilterableMoneyAmountProps,
  FilterablePriceListProps,
  MoneyAmountDTO,
  PriceListDTO,
  UpdateCurrencyDTO,
  UpdateMoneyAmountDTO,
  UpdatePriceListDTO,
>>>>>>> e0cc483e6 (update types service for pricing)
} from "./common"

export interface IPricingModuleService {
  __joinerConfig(): ModuleJoinerConfig

  calculatePrices(
    priceSetIds: string[],
    pricingContext: PricingContext,
    sharedContext?: Context
  ): Promise<CalculatedPriceSetDTO>

  retrieve(
    id: string,
    config?: FindConfig<PriceSetDTO>,
    sharedContext?: Context
  ): Promise<PriceSetDTO>

  list(
    filters?: FilterablePriceSetProps,
    config?: FindConfig<PriceSetDTO>,
    sharedContext?: Context
  ): Promise<PriceSetDTO[]>

  listAndCount(
    filters?: FilterablePriceSetProps,
    config?: FindConfig<PriceSetDTO>,
    sharedContext?: Context
  ): Promise<[PriceSetDTO[], number]>

  create(
    data: CreatePriceSetDTO[],
    sharedContext?: Context
  ): Promise<PriceSetDTO[]>

  update(
    data: UpdatePriceSetDTO[],
    sharedContext?: Context
  ): Promise<PriceSetDTO[]>

  delete(ids: string[], sharedContext?: Context): Promise<void>

  retrieveMoneyAmount(
    id: string,
    config?: FindConfig<MoneyAmountDTO>,
    sharedContext?: Context
  ): Promise<MoneyAmountDTO>

  listMoneyAmounts(
    filters?: FilterableMoneyAmountProps,
    config?: FindConfig<MoneyAmountDTO>,
    sharedContext?: Context
  ): Promise<MoneyAmountDTO[]>

  listAndCountMoneyAmounts(
    filters?: FilterableMoneyAmountProps,
    config?: FindConfig<MoneyAmountDTO>,
    sharedContext?: Context
  ): Promise<[MoneyAmountDTO[], number]>

  createMoneyAmounts(
    data: CreateMoneyAmountDTO[],
    sharedContext?: Context
  ): Promise<MoneyAmountDTO[]>

  updateMoneyAmounts(
    data: UpdateMoneyAmountDTO[],
    sharedContext?: Context
  ): Promise<MoneyAmountDTO[]>

  deleteMoneyAmounts(ids: string[], sharedContext?: Context): Promise<void>

  retrieveCurrency(
    code: string,
    config?: FindConfig<CurrencyDTO>,
    sharedContext?: Context
  ): Promise<CurrencyDTO>

  listCurrencies(
    filters?: FilterableCurrencyProps,
    config?: FindConfig<CurrencyDTO>,
    sharedContext?: Context
  ): Promise<CurrencyDTO[]>

  listAndCountCurrencies(
    filters?: FilterableCurrencyProps,
    config?: FindConfig<CurrencyDTO>,
    sharedContext?: Context
  ): Promise<[CurrencyDTO[], number]>

  createCurrencies(
    data: CreateCurrencyDTO[],
    sharedContext?: Context
  ): Promise<CurrencyDTO[]>

  updateCurrencies(
    data: UpdateCurrencyDTO[],
    sharedContext?: Context
  ): Promise<CurrencyDTO[]>

  deleteCurrencies(
    currencyCodes: string[],
    sharedContext?: Context
  ): Promise<void>

  retrievePriceList(
    code: string,
    config: FindConfig<PriceListDTO>,
    sharedContext?: Context
  ): Promise<PriceListDTO> 

  listPriceLists(
    filters: FilterablePriceListProps,
    config: FindConfig<PriceListDTO>,
    sharedContext?: Context
  ): Promise<PriceListDTO[]> 

  listAndCountPriceLists(
    filters: FilterablePriceListProps,
    config: FindConfig<PriceListDTO>,
    sharedContext?: Context
  ): Promise<[PriceListDTO[], number]> 

  createPriceLists(
    data: CreatePriceListDTO[],
    sharedContext?: Context
  ) : Promise<PriceListDTO[]>

  updatePriceLists(
    data: UpdatePriceListDTO[],
    sharedContext?: Context
  ) : Promise<PriceListDTO[]>

  deletePriceLists(
    currencyCodes: string[],
    sharedContext?: Context
  ): Promise<void>
}
