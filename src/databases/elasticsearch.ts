import { Client } from 'elasticsearch';

const client = new Client({
  host: process.env.ELASTICSEARCH_HOST
});

const index = 'accounts';

export class ElasticClient {
  private client: Client;
  private index: string;

  constructor() {
    this.client = client;
    this.index = index;
  }

  async getData(size?: number) {
    let result;
    try {
      result = await client.search ({
        index,
        size: size ? size : 10,
      })
    } catch (error) {
      throw error
    }

    return result;
  }

  async getByState(state: string) {
    let result;
    try {
      result = await client.search({
        index,
        body: {
          query: {
            match: {
              state: state,
            }
          }
        }
      })
    } catch (error) {
      throw error
    }

    return result;
  }

  async getByEmployer(state: string, employer: string) {
    let result;
    try {
      result = await client.search({
        index: 'accounts',
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                  state,
                }
              },
                {
                  match: {
                    employer,
                  }
                }
              ]
          }
        }
      }
    })

    
    } catch (error) {
      throw error;
      
    }

    return result
  }

  async getByAccountNumber(accountNumber: number) {
    let result;
    try {
      result = await client.search({
        index: 'accounts',
        body: {
          query: {
            match: {
              account_number: accountNumber,
            }
          }
        }  
      })
    } catch (error) {
      throw error;
    }

    return result;
  }

  async getByAccountNumberRange(accountNumbers: number[]) {
    let result;
    const [acc1, acc2] = accountNumbers;
    try {
      result = await client.search({
        index: 'accounts',
        body: {
          query: {
            range: {
              account_number: {
                gte: acc1,
                lte: acc2,
              }
            }
          }
        }
      })
    } catch (error) {
      throw error;
    }

    return result;
  }

  async getByAge(age: number) {
    let result;
    try {
      result = await client.search({
        index: 'accounts',
        body: {
          query: {
            match: {
              gte: age,
            }
          }
        }
      })
    } catch (error) {
      throw error;
    }

    return result;
  }
}