import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import TaxTableRepository from "../../domain/repository/TaxTableRepository";
import PgPromiseDatabase from "../database/PgPromiseDatabase";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";
import StockEntryRepositoryDatabase from "../repository/database/StockEntryRepositoryDatabase";
import TaxTableRepositoryDatabase from "../repository/database/TaxTableRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    }

    createCouponRepository(): CouponRepository {
        return new CouponRepositoryDatabase(PgPromiseDatabase.getInstance());
    }

    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
    }

    createTaxTableRepository(): TaxTableRepository {
        return new TaxTableRepositoryDatabase(PgPromiseDatabase.getInstance());
    }

    createStockEntryRepository(): StockEntryRepository {
        return new StockEntryRepositoryDatabase(PgPromiseDatabase.getInstance());
    }
}