<script>
export default {
  data () {
    return {
       res:{
        code: 0,
          data: {
            // 以下两组数据不用管，是混淆用的
            lines: '20路,301路,5路,地铁5号线,机场大巴线,107路,机场快轨',
            lineids: 'lzbd,lwes,lxid,lwic,lwdf,ldfx,loin',
            // 操作下面这个对象
            // 遍历linedetails，如lwdf: {name: '机场大巴线'}，然后用name做判别条件
            // name的开头
            linedetails: {
              lwdf: {
                name: '机场大巴线'
              },
              lwes: {
                name: '301路'
              },
              lwic: {
              name: '地铁5号线'
              },
              ldfx: {
                name: '107路'
              },
              lzbd: {
                name: '20路'
              },
              lxid: {
                name: '5路'
              },
              loin: {
                name: '机场快轨'
              }
            }
          }
        }



      [
      {
        lxid: {
          name: '5路'
        }
      }, {
        lzbd: {
          name: '20路'
        }
      }, {
      ldfx: {
        name: '107路'
        }
      }, {
      lwes: {
        name: '301路'
        }
      }, {
      lwic: {
        name: '地铁5号线'
        }
      }, {
      loin: {
        name: '机场快轨'
        }
      }, {
      lwdf: {
        name: '机场大巴线'
        }
      }]
</script>
