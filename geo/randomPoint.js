const fs = require('fs');
const turf = require('@turf/turf');

// 读取GeoJSON文件
const geojsonFilePath = './data/file.geojson';
const geojson = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

// 随机生成多边形内的点
function generateRandomPointsInPolygon(geojson, numPoints, dataType) {
    const bbox = turf.bbox(geojson);

    const randomPoints = turf.randomPoint(numPoints, { bbox: bbox });

    const pointsInsidePolygon = randomPoints.features.filter(point => {
        return turf.booleanPointInPolygon(point, geojson);
    });

    // 在每个要素的properties中添加属性dataType
    pointsInsidePolygon.forEach(point => {
        point.properties.dataType = dataType;
    });
    return pointsInsidePolygon;
}

const typeInfos = ["基础配套~区域特征~住宅区",
    "基础配套~区域特征~平均房价",
    "基础配套~区域特征~写字楼",
    "基础配套~区域特征~租金",
    "基础配套~配套设施~商圈",
    "基础配套~配套设施~学校",
    "基础配套~配套设施~医院",
    "基础配套~配套设施~公司",
    "基础配套~配套设施~酒店",
    "基础配套~配套设施~金融",
    "基础配套~配套设施~商铺",
    "基础配套~配套设施~餐饮",
    "基础配套~交通概况~公交站",
    "基础配套~交通概况~公交线路",
    "基础配套~交通概况~地铁站",
    "基础配套~交通概况~地铁线路",
    "基础配套~交通概况~停车场",
    "基础配套~交通概况~充电桩",
    "基础配套~交通概况~客运站",
    "周边业态~美食餐饮~中餐厅",
    "周边业态~美食餐饮~快餐厅",
    "周边业态~美食餐饮~餐饮相关场所",
    "周边业态~美食餐饮~糕饼店",
    "周边业态~美食餐饮~咖啡厅",
    "周边业态~美食餐饮~外国餐厅",
    "周边业态~美食餐饮~冷饮店",
    "周边业态~美食餐饮~其他",
    "周边业态~生活服务~生活服务场所",
    "周边业态~生活服务~美容美发店",
    "周边业态~生活服务~中介机构",
    "周边业态~生活服务~洗浴推拿场所",
    "周边业态~生活服务~物流速递",
    "周边业态~生活服务~摄影冲印店",
    "周边业态~生活服务~洗衣店",
    "周边业态~生活服务~其他",
    "周边业态~宾馆酒店~住宿服务相关",
    "周边业态~宾馆酒店~宾馆酒店",
    "周边业态~宾馆酒店~旅馆招待所",
    "周边业态~医疗卫生~综合医院",
    "周边业态~医疗卫生~专科医院",
    "周边业态~医疗卫生~诊所",
    "周边业态~医疗卫生~动物医疗场所",
    "周边业态~体育休闲~休闲场所",
    "周边业态~体育休闲~体育休闲服务场所",
    "周边业态~体育休闲~娱乐场所",
    "周边业态~体育休闲~度假疗养场所",
    "周边业态~体育休闲~影剧院",
    "周边业态~体育休闲~运动场馆",
    "周边业态~金融银行~保险公司",
    "周边业态~金融银行~自动提款机",
    "周边业态~金融银行~证券公司",
    "周边业态~金融银行~财务公司",
    "周边业态~金融银行~金融保险服务机构",
    "周边业态~金融银行~银行",
    "周边业态~金融银行~银行相关"]


let randomPoints = []
typeInfos.forEach(typeInfo => {
    const getRandomPoints = generateRandomPointsInPolygon(geojson, 10, typeInfo);
    randomPoints.push(...getRandomPoints)
})

// 将生成的随机点保存成GeoJSON格式
const outputGeojson = {
    type: 'FeatureCollection',
    features: randomPoints
};

// 将GeoJSON写入文件
const outputFilePath = './data/randomPoints.geojson';
fs.writeFileSync(outputFilePath, JSON.stringify(outputGeojson, null, 2));

console.log(`Generated Random Points Inside Polygon and saved to ${outputFilePath}`);
