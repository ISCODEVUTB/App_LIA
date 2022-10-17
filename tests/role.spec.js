import Role from '../routes/role';
import request from 'supertest';

describe('GET /role',()=>{
    test('should response with a 200 status code',async ()=> {
        const response = await (await request(Role).get('/api/role')).send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond an array", async () => {
        const response = await request(Role).get("/api/role").send();
        expect(response.body).toBeInstanceOf(Array);
      });
});

describe("POST /role", () => {
    describe("given a name and description", () => {
      const newRole = {
        name: "some name",
        description: "some description",
      };
  
      test("should respond with a 200 status code", async () => {
        const response = await request(Role).post("/api/role").send(newRole);
        expect(response.statusCode).toBe(200);
      });
  
      test("should have a Content-Type: application/json header", async () => {
        const response = await request(Role).post("/api/role").send(newRole);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });
  
      test("should respond with an role ID", async () => {
        const response = await request(Role).post("/api/role").send(newRole);
        expect(response.body.id).toBeDefined();
      });
    });
});

describe("when the name and description is missing", () => {
    test("shoud respond with a 400 status code", async () => {
      const fields = [
        {name: "some title"},
        {description: "some description"},
      ];
      for (const body of fields) {
        const response = await request(Role).post("/api/role").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
});