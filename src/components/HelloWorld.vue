<template>
  <div class="hello">
    <!-- 隐藏表单 -->
    <form id="fileForm" enctype="multipart/form-data" class="form-horizontal">
      <input
        class="form-control"
        type="file"
        name="file"
        @change="handleFileChange"
        ref="inputer"
        style="display: none"
        id="myFile"
      />
    </form>

    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      上传图片
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">上传图片</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 图片容器 -->
            <!-- <div
              id="carouselExampleFade"
              class="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <div class="carousel-inner" id="imgdiv">
                <div class="carousel-item active">
                  <img
                    :src="queryFirmInfo.idPicUrl[0]"
                    class="d-block w-100"
                    alt="..."
                    id="imgsrc"
                    @click="imgbig"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    :src="queryFirmInfo.idPicUrl[1]"
                    class="d-block w-100"
                    alt="..."
                    id="imgsrc"
                    @click="imgbig"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    :src="queryFirmInfo.idPicUrl[2]"
                    class="d-block w-100"
                    alt="..."
                    id="imgsrc"
                    @click="imgbig"
                  />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleFade"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleFade"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div> -->
            <div id="imgdiv" @click="imgbig">
              <img
                :src="queryFirmInfo.idPicUrl"
                alt=""
                class="myimage"
                :name="queryFirmInfo.idPicUrl"
                id="imgsrc"
              />
            </div>
            <div class="handleimg-head">
              <img
                class="imgbtn expand"
                src="../../static/images/expand.png"
                @click="expand"
                alt="放大"
              />
              <img
                class="imgbtn narrow"
                src="../../static/images/narrow.png"
                @click="narrow"
                alt="缩小"
              />
            </div>
            <!-- 放大遮罩层 -->
            <div id="bigimg" @click="closeimg" style="z-index: 1"></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default"
              onclick="$('#myFile').click();"
            >
              浏览
            </button>
            <button type="button" class="btn btn-primary">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @method :form表单提交文件
// @param url ：请求路径
// @param data ：请求数据(new FormData($( "#imgForm" )[0]))
// @param method：回调方法
function baseFileAjax(data, method) {
  $.ajax({
    url: "http://localhost:3000/api/v1/pictures",
    type: "POST",
    data: data,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: method,
    error: function (returndata) {
      alert("Connection error");
    },
  });
}
export default {
  name: "HelloWorld",
  data() {
    return {
      queryFirmInfo: {
        idPicUrl: "",
      },
    };
  },
  methods: {
    //选择改变图片
    handleFileChange(e) {
      var vm = this;
      let file = e.target.files[0]; //获取图片信息
      let supportedTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        baseFileAjax(new FormData($("#fileForm")[0]), function (result) {
          vm.queryFirmInfo["idPicUrl"] = result.url;
          // vm.queryFirmInfo["idPicUrl"].push(result.url);
        });
      } else {
        alert("文件格式只支持：jpg、jpeg 和 png");
      }
    },
    imgbig() {
      var imgsrc = $("#imgsrc").attr("src");
      $("#bigimg").css("display", "block");
      $("#bigimg").html("<img src=" + imgsrc + " />");
    },
    // 关闭
    closeimg() {
      $("#bigimg").css("display", "none");
    },
    //放大
    expand() {
      var imgsrc = document.getElementById("imgsrc");
      if (imgsrc) {
        imgsrc.style.height = imgsrc.offsetHeight * 1.1 + "px";
      }
    },
    //缩小
    narrow() {
      var imgsrc = document.getElementById("imgsrc");
      if (imgsrc) {
        imgsrc.style.height = imgsrc.offsetHeight / 1.1 + "px";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#imgdiv {
  width: 50%;
  margin: 50px auto;
}

#imgdiv img {
  max-height: 250px;
  max-width: 250px;
}

#bigimg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: none;
}

#bigimg img {
  width: 1000px;
  margin: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 80px;
  cursor: pointer;
}

.handleimg-head {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.handleimg-head .imgbtn {
  height: 100%;
  margin: 0 10px;
  cursor: pointer;
}
#carouselExampleFade {
  background-color: #ccc;
}
</style>
