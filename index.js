const core = require('@actions/core');
const axios = require('axios');

const testCases = {
    "superapp": [
        async (appUrl) => {
            try {
                const response = await axios.put(`http://${appUrl}/key/test`);
                if (response.data.key === "test" && response.data.value === "1") {
                    return true;
                }
                return false;
              } catch (error) {
                console.log(error.code)
                return false;
              }
        },
        async (appUrl) => {
            try {
                const response = await axios.get(`http://${appUrl}/key/test`);
                if (response.data.key === "test" && response.data.value === "1") {
                    return true;
                }
                return false;
              } catch (error) {
                console.log(error.code)
                return false;
              }
        },
        async (appUrl) => {
            try {
                const response = await axios.delete(`http://${appUrl}/key/test`);
                if (response.data.key === "test" && response.data.value === "deleted") {
                    return true;
                }
                return false;
              } catch (error) {
                console.log(error.code)
                return false;
              }
        },
        async (appUrl) => {
            try {
                const response = await axios.put(`http://${appUrl}/key/test`);
                if (response.data.key === "test" && response.data.value === "1") {
                    return true;
                }
                return false;
              } catch (error) {
                console.log(error.code)
                return false;
              }
        },
        async (appUrl) => {
            try {
                const response = await axios.delete(`http://${appUrl}/key/test`);
                if (response.data.key === "test" && response.data.value === "deleted") {
                    return true;
                }
                return false;
              } catch (error) {
                console.log(error.code)
                return false;
              }
        }
    ]
}
const test = async () => {
    try {
        const appName = core.getInput('service_name');
        const appHost = core.getInput('service_host');
        const appPort = core.getInput('service_port');
        console.log(`Testing ${appName}!`);
    
        if (appName in testCases) {
            const results = {
                total: testCases[appName].length,
                passed: 0,
            };
    
            for (const testCase of testCases[appName]) {
                const result = await testCase(`${appHost}:${appPort}`)
                if (!!result){
                    results.passed++;
                } else {
                    break;
                }
            }
    
            if (results.passed < results.total) {
                core.setFailed(`Failed to pass all test cases: ${results.passed}/${results.total}`);
                return;
            }
    
            console.log(`All test passed for app: ${appName}`)
    
        } else {
            core.setFailed(`No test cases for ${appName}`);
            return;
        }
    
    
    
    } catch (error) {
      core.setFailed(error.message);
    }
}

test()
