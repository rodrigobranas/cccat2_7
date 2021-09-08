import PlaceOrderInput from "../../application/place-order/PlaceOrderInput";
import ZipcodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import Order from "../entity/Order";
import StockEntry from "../entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import TaxCalculatorFactory from "../factory/TaxCalculatorFactory";
import ZipcodeCalculatorAPI from "../gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import StockEntryRepository from "../repository/StockEntryRepository";
import TaxTableRepository from "../repository/TaxTableRepository";
import FreightCalculator from "./FreightCalculator";
import StockCalculator from "./StockCalculator";

export default class OrderCreator {

    zipcodeCalculator: ZipcodeCalculatorAPIMemory;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;
    taxTableRepository: TaxTableRepository;
    stockEntryRepository: StockEntryRepository;

    constructor (repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.taxTableRepository = repositoryFactory.createTaxTableRepository();
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
        this.zipcodeCalculator = zipcodeCalculator;
    }

    async create (input: PlaceOrderInput) {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-99");
        const taxCalculator = TaxCalculatorFactory.create(input.issueDate);
        const stockCalculator = new StockCalculator();
        for (const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.idItem);
            if (!item) throw new Error("Item not found");
            order.addItem(orderItem.idItem, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
            const taxTables = await this.taxTableRepository.getByIdItem(item.id);
            const taxes = taxCalculator.calculate(item, taxTables);
            order.taxes += taxes * orderItem.quantity;
            const stockEntries = await this.stockEntryRepository.getByIdItem(item.id);
            const quantity = stockCalculator.calculate(stockEntries);
            if (quantity < orderItem.quantity) throw new Error("Out of stock");
            this.stockEntryRepository.save(new StockEntry(item.id, "out", orderItem.quantity, new Date()));
            // EventPublisher.publish(new OrderCreated(order))
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        await this.orderRepository.save(order);
        return order;
    }
}