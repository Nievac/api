const cbAccountId = 'c2dck427'; // 8 character ID
const cbAppKeyPrefix = '725eb000'; // 8 character Prefix

const cbDomain = 'https://' + cbAccountId + '.caspio.com';
const cbDataPagePrefix = cbDomain + '/dp/' + cbAppKeyPrefix;

//* dpReady Mapping
const dpReadyMap = new Map();

function deployDP(containerID, appKey, params) {
    params = params || '';
    const dataPageScript = document.createElement("script");
    const container = document.getElementById(containerID);
    
    return new Promise((resolve, reject) => {
        dataPageScript.src = cbDataPagePrefix + appKey + '/emb' + params;
        console.log(cbDataPagePrefix + appKey);
        container.innerHTML = '';
        container.appendChild(dataPageScript);
        fancyLog('DEPLOYING', appKey)
        
        dpReadyMap.set(appKey, (e) => {
            if(!e.detail.appKey.includes(appKey)) return;

            clearTimeout(dpTimeout);
            resolve(e);
            fancyLog('DEPLOYED', appKey, 'success');
            document.removeEventListener('DataPageReady', dpReadyMap.get(appKey));
        })

        const dpTimeout = setTimeout(()=> { 
            reject('deploying dp Timeout: ' + appKey)
            document.removeEventListener('DataPageReady', dpReadyMap.get(appKey));
        }, 5000)
        

        document.addEventListener('DataPageReady', dpReadyMap.get(appKey));

    })
}

function fancyLog(label, body, type = 'info') {
    const bgColor = type == 'success' ? '#19c37d' : '#61dbfb';

    console.log(`%c ${label ?? ''} `, 
            `color: white; background-color: ${bgColor}`, 
            body ?? '');
}