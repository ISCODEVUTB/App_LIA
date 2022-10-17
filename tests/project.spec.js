import project from '../routes/project';
import request from 'supertest';

describe('GET /project',()=>{
    test('should response with a 200 status code',async ()=> {
        const response = await (await request(project).get('/api/project')).send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond an array", async () => {
        const response = await request(project).get("/api/project").send();
        expect(response.body).toBeInstanceOf(Array);
      });
});

describe("POST /api/project", () => {
    describe("given a name,description,date and technicalSkills", () => {
      const newProject = {
        name: "some name",
        description: "some description",
        date: 123125,
        technicalSkills: "some technicalSkill"
      };
  
      test("should respond with a 200 status code", async () => {
        const response = await request(project).post("/api/project").send(newProject);
        expect(response.statusCode).toBe(200);
      });
  
      test("should have a Content-Type: application/json header", async () => {
        const response = await request(project).post("/api/project").send(newProject);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });
  
      test("should respond with an project ID", async () => {
        const response = await request(project).post("/api/project").send(newProject);
        expect(response.body.id).toBeDefined();
      });
    });
});

describe("when the name,description,date and technicalSkills is missing", () => {
    test("shoud respond with a 400 status code", async () => {
      const fields = [
        {name: "some name"},
        {description: "some description"},
        {date: 123125},
        {technicalSkills: "some technicalSkill"}
      ];
      for (const body of fields) {
        const response = await request(project).post("/api/project").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
});