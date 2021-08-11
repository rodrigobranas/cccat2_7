import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";

test("Deve conectar no banco de dados e listar os itens", async function () {
    const pgPromiseDatabase = new PgPromiseDatabase();
    const itens = await pgPromiseDatabase.many("select * from ccca.item", []);
    expect(itens).toHaveLength(3);
});

test("Deve conectar no banco de dados e pegar um item", async function () {
    const pgPromiseDatabase = new PgPromiseDatabase();
    const item = await pgPromiseDatabase.one("select * from ccca.item where id = $1", [1]);
    expect(item.description).toBe("Guitarra");
});
