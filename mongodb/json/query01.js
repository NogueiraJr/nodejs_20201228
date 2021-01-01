use admin;
db.getCollection("products").find(
    { 
        "title" : /^Produto.*$/i
    }
);
