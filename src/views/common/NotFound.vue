<template>
  <div className="container">
    <div className="row">
      <div className="col-xs-10 col-xs-offset-1 col-sm-12">
        <div className="content">
          <h1>404</h1>
          <h2>你要查找的页面不存在。</h2>
          <t-button ghost variant="outline" size="large" @click="$router.back()">返回</t-button>
        </div>
      </div>
    </div>
  </div>

  <div className="fs">
    <div className="hold-illustration w-preserve-3d">
      <div className="background w-clearfix">
        <div className="left-strip"></div>
        <div className="top-bar">
          <div className="dot"></div>
          <div className="_2 dot"></div>
          <div className="_3 dot"></div>
        </div>
        <div className="text-like-box w-clearfix">
          <div className="text" data-ix="arrow-load" style="opacity: 1; transition: opacity 850ms ease 0s;">A</div>
          <div className="straight-line" data-ix="arrow-load"
               style="opacity: 1; transition: opacity 850ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation-2"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation-3"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation-6-long"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation-5"
               style="width: 100%; transition: width 2000ms ease 0s;"></div>
          <div className="shortened straight-line-full" data-ix="loading-line-animation-6shorted"
               style="width: 50%; transition: width 1500ms ease 0s;"></div>
        </div>
        <div className="mountain-photo-parent">
          <div className="mountain-photo__real-deal" data-ix="arrow-load"
               style="opacity: 1; transition: opacity 850ms ease 0s;">
            <div className="mountain" data-ix="mountain-slide-in-from-left"
                 style="transform: translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(45deg); transition: transform 1500ms ease 0s;"></div>
            <div className="_2 mountain" data-ix="mountain-slide-in"
                 style="transform: translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(45deg); transition: transform 1500ms ease 0s;"></div>
          </div>
          <div className="arrow-line" data-ix="arrow-load" style="opacity: 1; transition: opacity 850ms ease 0s;">
            <div className="arrow-line-small"></div>
            <div className="arrow-line-small v2"></div>
          </div>
        </div>
        <div className="square-tower" data-ix="arrow-load" style="opacity: 1; transition: opacity 850ms ease 0s;">
          <div className="play-box w-preserve-3d" data-ix="tower-hover-animation">
            <div className="play-box__top-bar"></div>
            <a className="overflow-hidden w-inline-block w-lightbox"
               href="https://404.life/demo/404-blue-bird-office/#">
              <div className="play-box__play-icon" data-ix="play-icon-on-load"
                   style="transform: translateX(0px) translateY(-50%) translateZ(0px); opacity: 1; transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s;"></div>
            </a>
          </div>
          <div className="play-box__square-1 w-preserve-3d"></div>
          <div className="play-box__square-2 w-preserve-3d"></div>
          <div className="play-box__square-bottom"></div>
        </div>
        <div className="tri-parent w-clearfix">
          <div className="column" data-ix="column-hover" style="opacity: 1; transition: opacity 500ms ease 0s;">
            <div className="circle" data-ix="pop-in"
                 style="opacity: 1; transform: scaleX(1) scaleY(1) scaleZ(1); transition: opacity 350ms ease 0s, transform 450ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation-2"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation-3"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
          </div>
          <div className="column" data-ix="column-hover-2" style="opacity: 1; transition: opacity 500ms ease 0s;">
            <div className="circle" data-ix="pop-in-2"
                 style="opacity: 1; transform: scaleX(1) scaleY(1) scaleZ(1); transition: opacity 350ms ease 0s, transform 450ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation"
                 style="width: 100%; transition: width 1500ms ease 0s;">
              <div className="straight-line-full"></div>
            </div>
            <div className="straight-line-full" data-ix="loading-line-animation-2"
                 style="width: 100%; transition: width 1500ms ease 0s;">
              <div className="straight-line-full"></div>
            </div>
            <div className="straight-line-full" data-ix="loading-line-animation-3"
                 style="width: 100%; transition: width 1500ms ease 0s;">
              <div className="straight-line-full"></div>
            </div>
          </div>
          <div className="column" data-ix="column-hover-3"
               style="opacity: 1; transition: opacity 500ms ease 0s, transform 400ms ease 0s; transform: translateX(0px) translateY(0px);">
            <div className="circle" data-ix="pop-in-3"
                 style="opacity: 1; transform: scaleX(1) scaleY(1) scaleZ(1); transition: opacity 350ms ease 0s, transform 450ms ease 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation"
                 style="width: 100%; transition: width 1500ms ease 0s;">
              <div className="straight-line-full"></div>
            </div>
            <div className="straight-line-full" data-ix="loading-line-animation-2"
                 style="width: 100%; transition: width 1500ms ease 0s;">
              <div className="straight-line-full"></div>
            </div>
            <div className="straight-line-full" data-ix="loading-line-animation-3"
                 style="width: 100%; transition: width 1500ms ease 0s;">
              <div className="straight-line-full"></div>
            </div>
          </div>
          <div className="string-block" data-ix="hovering-on-load-string-block"
               style="opacity: 1; transition: opacity 500ms ease 0s, transform 1500ms ease 0s; transform: translateX(0px) translateY(0px);">
            <div className="square">
              <div className="connector-bar"></div>
            </div>
            <div className="_2 square"></div>
            <div className="_3 square">
              <div className="connector-bar"></div>
            </div>
          </div>
          <div className="bottom text-like-box v2 w-clearfix" data-ix="column-hover"
               style="opacity: 1; transition: opacity 500ms ease 0s, transform 400ms ease 0s; transform: translateX(0px) translateY(0px);">
            <div className="straight-line-full" data-ix="loading-line-animation"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation-2"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation-3"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
            <div className="straight-line-full" data-ix="loading-line-animation-6-long"
                 style="width: 100%; transition: width 1500ms ease 0s;"></div>
            <div className="shortened straight-line-full" data-ix="loading-line-animation-4-shortened"
                 style="width: 50%; transition: width 1500ms ease 0s;"></div>
            <div className="mountain-photo__real-deal small" data-ix="column-hover"
                 style="opacity: 1; transition: opacity 500ms ease 0s, transform 400ms ease 0s; transform: translateX(0px) translateY(0px);">
              <div className="mountain shrunked" data-ix="mountain-slide-in-from-left"
                   style="transform: translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(45deg); transition: transform 1500ms ease 0s;"></div>
              <div className="_2 mountain shrunked" data-ix="mountain-slide-in"
                   style="transform: translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(45deg); transition: transform 1500ms ease 0s;"></div>
            </div>
            <div className="mountain-photo__real-deal no-mountains small" data-ix="column-hover"
                 style="opacity: 1; transition: opacity 500ms ease 0s, transform 400ms ease 0s; transform: translateX(0px) translateY(0px);"></div>
          </div>
        </div>
        <div className="bottom text-like-box" data-ix="column-hover"
             style="opacity: 1; transition: opacity 500ms ease 0s;">
          <div className="straight-line-full" data-ix="loading-line-animation"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation-2"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="straight-line-full" data-ix="loading-line-animation-3"
               style="width: 100%; transition: width 1500ms ease 0s;"></div>
          <div className="shortened straight-line-full" data-ix="loading-line-animation-4-shortened"
               style="width: 50%; transition: width 1500ms ease 0s;"></div>
        </div>
        <div className="bottom-line-bar" data-ix="column-hover-3"
             style="opacity: 1; transition: opacity 500ms ease 0s;"></div>
        <div className="circle-tower" data-ix="column-hover" style="opacity: 1; transition: opacity 500ms ease 0s;">
          <div className="circle-top w-preserve-3d"></div>
          <div className="_2 circle-top w-preserve-3d"></div>
          <div className="_3 circle-top"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped lang="less">
@import "../../styles/reveal.less";
@import "../../styles/style.less";
</style>
