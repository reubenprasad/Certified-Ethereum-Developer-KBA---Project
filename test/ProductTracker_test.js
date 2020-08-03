const ProductTracker = artifacts.require('./ProductTracker.sol')

contract('ProductTracker', ([manufacturer, buyer]) =>{
    let producttracker

    before(async() => {
        producttracker = await ProductTracker.deployed()
    })

    describe('deployment', async() =>{
        it('deploys successfully',async() =>{                   //Test to check whether contract is deployed properly and has a valid address
            const address =  await producttracker.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

    it('has valid manufacturer address', async() =>{                        //Test to check whether manufacturer address is set correctly
        const mfr_address = await producttracker.product_manufacturer()
        assert.notEqual(mfr_address, 0x0)
        assert.notEqual(mfr_address, '')
        assert.notEqual(mfr_address, null)
        assert.notEqual(mfr_address, undefined)
    })
    
    })

    describe('products',async() =>{         //Tests to check if products are added correctly and product count is incremented 
        let result, productCount
        before(async() =>{
            result = await producttracker.addProduct(1001,'Samsung TV',0,2,web3.utils.toWei('1','Ether'),{from: manufacturer})   
            productCount = await producttracker.productCount()
        })

        it('adds products', async() =>{
            assert.equal(productCount,1)
            const event = result.logs[0].args
            assert.equal(event.name, 'Samsung TV','name is correct') 
            assert.equal(event.price,'1000000000000000000','price is correct')
            assert.equal(event.ownerAddress,manufacturer,'owner is correct')
        })

        it('lists products', async() =>{
            const product = await producttracker.product(1001)
            assert.equal(product.name, 'Samsung TV','name is correct') 
            assert.equal(product.price,'1000000000000000000','price is correct')
            assert.equal(product.ownerAddress,manufacturer,'owner is correct')
        })

    })
})