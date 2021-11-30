function main() {
  const productsSection = $(
    ".category-product-list.product-list.test.layout-module"
  );

  const quickViewButton = $(
    "<button rel='modal:open' class='quick-view'></button>"
  ).text("Quick View");

  $("head").append(
    $(`
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.green.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
	`)
  );

  const modal = $(`
	<div class="modal custom-modal">
	</div>`);

  $("body").append(modal);

  function clickHandler(event) {
    $("#carousel-container").remove();
    modal.modal();
    const url = previousTarget.find("a.link-wrapper").attr("href");
    $.get(url, function (data) {
      const allImages = $(data)
        .find(`section.image-list[data-block="product_view_media"] ul li.item`)
        .map((i, e) => {
          return `<div class="owl-item"><img src="${e.getAttribute(
            "data-gallery"
          )}"/></div>`;
        });
      const temp = `		<div id="carousel-container">
			<div class="owl-carousel owl-theme owl-loaded">
			    <div class="owl-stage-outer">
			        <div class="owl-stage custom-stage">
								${allImages.get().join("")}
			        </div>
			    </div>
			    <div class="owl-nav">
			        <div class="owl-prev">prev</div>
			        <div class="owl-next">next</div>
			    </div>
			</div>
		</div>
`;

      modal.append(temp);

      const owl = $(".owl-carousel.owl-theme");

      owl.owlCarousel({
        dots: false,
        margin: 15,
        loop: true,
        center: true,
        stagePadding: 10,
        lazyLoad: true,
      });

      $(".owl-next").click(function () {
        owl.trigger("next.owl.carousel");
      });
      $(".owl-prev").click(function () {
        owl.trigger("prev.owl.carousel", [300]);
      });
    });
  }

  let previousTarget;
  function hoverHandler(event) {
    let currentTarget = $(event.target);
    while (!currentTarget.is(productsSection)) {
      if (currentTarget.hasClass("product-card")) {
        currentTarget.append(quickViewButton);
        quickViewButton.show();
        currentTarget?.addClass("margin-fix");
        previousTarget?.removeClass("margin-fix");
        previousTarget = currentTarget;
        break;
      }
      currentTarget = currentTarget.parent();
    }
    if (currentTarget.is(productsSection)) {
      quickViewButton.hide();
    }
  }

  quickViewButton.click(clickHandler);

  productsSection.mouseover(hoverHandler);
}

function loadScript(url) {
  return new Promise((resolve) => {
    const scriptContainer = document.createElement("script");
    scriptContainer.onload = () => resolve();
    scriptContainer.src = url;
    document.head.appendChild(scriptContainer);
  });
}

async function loadDependancies() {
  await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"
  );
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
  );
  main();
}

loadDependancies();
