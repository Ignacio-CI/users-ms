export default function createAuth({
    makeInputObj,
    findDocuments,
    insertDocument,
    get,
    logger,
  }) {
    return Object.freeze({ auth });
    
    async function auth({
      params,
      dbConfig,
      errorMsgs
    }){
      let user;
        logger.info('[POST][USE-CASE] Inserting object process - START!');
        const userFactory = makeInputObj({ params });
  
        user = {
          username: userFactory.username(),
          password: userFactory.password(),
          usernameHash: userFactory.usernameHash(),
          usernamePasswordHash: userFactory.usernamePasswordHash(),
        }
        
        // 'or' query
        const checkUserExists = await findDocuments({
            query: { 
                usernamePasswordHash: user.usernamePasswordHash}, dbConfig 
            })
        
        if(!checkUserExists.length) throw new Error('Invalid username or password');   
        
    
        logger.info('[POST][USE-CASE] Inserting object process - DONE!');
        
        const results = get({ params: { username: user.username }});
  
        return results;
      }
  }