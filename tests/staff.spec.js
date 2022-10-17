import Staff from '../routes/staff';
import request from 'supertest';

describe('GET /staff',()=>{
    test('should response with a 200 status code',async ()=> {
        const response = await (await request(Staff).get('/api/staff')).send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond an array", async () => {
        const response = await request(Staff).get("/api/staff").send();
        expect(response.body).toBeInstanceOf(Array);
      });
});

describe("POST /staff", () => {
    describe("given a name,lastname and area", () => {
      const newStaff = {
        name: "some name",
        lastName: "some lastname",
        area: "some area"
      };
  
      test("should respond with a 200 status code", async () => {
        const response = await request(Staff).post("/api/staff").send(newStaff);
        expect(response.statusCode).toBe(200);
      });
  
      test("should have a Content-Type: application/json header", async () => {
        const response = await request(Staff).post("/api/staff").send(newStaff);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });
  
      test("should respond with an staff ID", async () => {
        const response = await request(Staff).post("/api/staff").send(newStaff);
        expect(response.body.id).toBeDefined();
      });
    });
});

describe("when the name,lastname and area is missing", () => {
    test("shoud respond with a 400 status code", async () => {
      const fields = [
        {name: "some title"},
        {description: "some description"},
        {area: "some area"}
      ];
      for (const body of fields) {
        const response = await request(Staff).post("/api/staff").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
});