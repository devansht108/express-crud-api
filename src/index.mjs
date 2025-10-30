import express from "express";

const app=express();

app.use(express.json());

const PORT=process.env.PORT||3000;

const mockProducts=[{productName:"chair",id:1,price:"Rs21"},{productName:"bed",id:2,price:"Rs213"}];

app.get("/",(request, response)=>{
  response.status(201).send("Hello world!");
});

app.get("/api/products",(req,res)=>{
  console.log(req.query);

  const {
    query: {filter,value},}=req;

    if(!filter&&!value) return res.send(mockProducts);
    if(filter&&value) return res.send(mockProducts.filter((products)=>products[filter].includes(value)));
    return res.send(mockProducts);
})

app.get("/api/products/:id",(req,res)=>{
  const parsedId=parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400).send("Invalid");

  const findProduct=mockProducts.find((products)=>products.id===parsedId);
if(!findProduct) return res.sendStatus(404);
return res.send(findProduct);
});

app.post("/api/products", (req , res)=>{
  const {body}=req;
  const newProduct={id:mockProducts[mockProducts.length-1].id+1,...body};
  console.log(newProduct);
  mockProducts.push(newProduct);
  return res.status(201).send(newProduct);
});

app.put("/api/products/:id", (req,res)=>{
  const {
    body,
    params:{id}
  } = req;

  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return res.sendStatus(400);
  const findProductIndex=mockProducts.findIndex((products)=>products.id===parsedId);
  if(findProductIndex===-1) return res.sendStatus(404);
  mockProducts[findProductIndex]={id:parsedId , ...body};
  return res.sendStatus(200);
}
)

app.patch("/api/products/:id", (req,res)=>{
  const {
    body,
    params:{id}
  } = req;

  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return res.sendStatus(400);
  const findProductIndex=mockProducts.findIndex((products)=>products.id===parsedId);
  if(findProductIndex===-1) return res.sendStatus(404);
  mockProducts[findProductIndex]={...mockProducts[findProductIndex], ...body};
  return res.sendStatus(200);
}
)

app.delete("/api/products/:id" , (req,res)=>{
  const {
    params:{id}
  }=req;

  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return res.sendStatus(400);

  const findProductIndex=mockProducts.findIndex((products)=>products.id===parsedId);
  if(findProductIndex===-1) return res.sendStatus(404);
  mockProducts.splice(findProductIndex,1);
  return res.sendStatus(200);
})


app.listen(PORT , ()=>{
  console.log(`Running on port ${PORT}`);
});;