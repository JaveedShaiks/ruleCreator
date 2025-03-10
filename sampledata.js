var data  = {
    "id": "0194f8cf-3caa-79cb-b0a6-69d715fd34e3",
    "name": "Template Customer Discount Predication",
    "rules": {
      "all": [
        {
          "name": "Rule Premium Customer Discount with more than 10k Purchase",
          "steps": {
            "or": [
              {
                "name": "Step Premium Customer Discount with more than 10k Purchase",
                "on_success": [
                  {
                    "action": "print",
                    "text": "Found Premium Customer with greater than 10K purchase amount"
                  }
                ],
                "conditions": {
                  "and": [
                    {
                      "metric": "amountPurchased",
                      "operator": "greater_than",
                      "value": 10000
                    },
                    {
                      "and": [
                        {
                          "metric": "customerType",
                          "operator": "equals",
                          "value": "PREMIUM"
                        }
                      ],
                      "type": "and"
                    }
                  ],
                  "type": "and"
                }
              }
            ]
          }
        }
      ]
    }
  }