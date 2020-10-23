module.exports = {
    users: [{
            name: '林壁帆',
            num: '13553387170',
            prize: 'iphone12'
        },
        {
            name: '林壁帆',
            num: '13553387170',
            prize: 'iphone11'
        },
    ],
    probability: 2,
    setP(NewP) {
        this.probability = NewP
        return this.probability
    }

}