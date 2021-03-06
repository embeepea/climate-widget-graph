var cwg = undefined;

$(document).ready(function() {

    function populate_variables(frequency) {
        var variables = climate_widget.variables(frequency);
        $("select#variable").empty();
        $(variables.map(function(v) {
            return ('<option value="' + v.id + '"' + '>'  + v.title + '</option>');
        }).join("")).appendTo($("select#variable"));
    }

    function update_frequency_ui() {
        var freq = $('#frequency').val();
        if (freq === "annual") {
            $('#timeperiod').attr("disabled", "true");
            $('label[for=timeperiod]').css("opacity", 0.5);
            $('#presentation').removeAttr("disabled");
            $('label[for=presentation]').css("opacity", 1.0);
            $('#slider-range').show();
            $('#x-axis-pan-note').hide();
        }
        if (freq === "monthly") {
            $('#timeperiod').removeAttr("disabled");
            $('label[for=timeperiod]').css("opacity", 1.0);
            $('#presentation').attr("disabled", "true");
            $('label[for=presentation]').css("opacity", 0.5);
            $('#slider-range').hide();
            $('#x-axis-pan-note').show();
        }
        if (freq === "seasonal") {
            $('#timeperiod').removeAttr("disabled");
            $('label[for=timeperiod]').css("opacity", 1.0);
            $('#presentation').attr("disabled", "true");
            $('label[for=presentation]').css("opacity", 0.5);
            $('#slider-range').hide();
            $('#x-axis-pan-note').show();
        }
        populate_variables(freq);
    }

    update_frequency_ui();

    $('#state').change(function() {
      var stateCounties = counties[$('#state').val()];

      var $el = $("#county");
      $el.empty();
      stateCounties.forEach(function(sc) {
        $el.append($("<option></option>")
           .attr("value", sc.fips).text(sc.label));
      });

      $('#county').trigger('change');
    });
    // trigger initial state set
    $('#state').trigger('change');

    $('#frequency').change(function() {
        update_frequency_ui();
        cwg.update({
            frequency: $('#frequency').val(),
            variable: $('#variable').val()
        });
    });

    $('#timeperiod').change(function() {
        cwg.update({
            timeperiod: $('#timeperiod').val()
        });
    });
    $('#county').change(function() {
        cwg.update({
            fips: $('#county').val()
        });
    });
    $('#variable').change(function() {
        cwg.update({
            variable: $('#variable').val()
        });
    });
    $('#scenario').change(function() {
        cwg.update({
            scenario: $('#scenario').val()
        });
    });
    $('#presentation').change(function() {
        cwg.update({
            presentation: $('#presentation').val()
        });
    });
    $('#median').change(function() {
        cwg.update({
            pmedian: $('#median').val(),
            hmedian: $('#median').val()
        });
    });
    $('#range').change(function() {
        cwg.update({
            hrange: $('#range').val(),
            prange: $('#range').val()
        });
    });
    $('#histmod').change(function() {
        cwg.update({
            histmod: $('#histmod').val()
        });
    });
    $('#histobs').change(function() {
        cwg.update({
            histobs: $('#histobs').val()
        });
    });

    $('#download-button').click(function() {
        if (cwg) {
            var $ul = $('#download-panel').find('ul');
            $ul.empty();
            var dataurls = cwg.dataurls();
            if (dataurls.hist_obs) {
                $ul.append($("<li><a href='"+dataurls.hist_obs+"'>Observed Data</a></li>"));
            }
            if (dataurls.hist_mod) {
                $ul.append($("<li><a href='"+dataurls.hist_mod+"'>Historical Modeled Data</a></li>"));
            }
            if (dataurls.proj_mod) {
                $ul.append($("<li><a href='"+dataurls.proj_mod+"'>Projected Modeled Data</a></li>"));
            }
            $('#download-panel').removeClass("hidden");
        }
    });
    $('#download-dismiss-button').click(function() {
        $('#download-panel').addClass("hidden");
    });

    // download hook
    $('#download-image-link').click(function() {
      cwg.downloadImage(this, 'graph.png');
    });

    $("#slider-range").slider({
        range: true,
        min: 1950,
        max: 2099,
        values: [ 1950, 2099 ],
        slide: function( event, ui ) {
            // return the return value returned by setXRange, to keep
            // the slider thumb(s) from moving into a disallowed range
            return cwg.setXRange(ui.values[0], ui.values[1]);
        }
    });

    // This function will be called whenever the user changes the x-scale in the graph.
    function xrangeset(min,max) {
        // Force the slider thumbs to adjust to the appropriate place
        $("#slider-range").slider("option", "values", [min,max]);
    }

    $(window).resize(function() {
        cwg.resize();
    });

    WebFont.load({
        google: {
            families: ['Pacifico', 'Roboto']
        },
        active: function() {
            cwg = climate_widget.graph({
                'div'           :  "div#widget",
                'dataprefix'    : 'http://climate-widget-data.nemac.org/data',
                'font'          : 'Roboto',
                'frequency'     : $('#frequency').val(),
                'timeperiod'    : $('#timeperiod').val(),
                'fips'          : $('#county').val(),
                'variable'      : $('#variable').val(),
                'scenario'      : $('#scenario').val(),
                'presentation'  : $('#presentation').val(),
                'xrangefunc'    : xrangeset
            });
        }
    });
});

//--------------------------------------------------------------------------
var counties = {
  "AL": [
    {
      "label": "Autauga County",
      "fips": "01001"
    },
    {
      "label": "Baldwin County",
      "fips": "01003"
    },
    {
      "label": "Barbour County",
      "fips": "01005"
    },
    {
      "label": "Bibb County",
      "fips": "01007"
    },
    {
      "label": "Blount County",
      "fips": "01009"
    },
    {
      "label": "Bullock County",
      "fips": "01011"
    },
    {
      "label": "Butler County",
      "fips": "01013"
    },
    {
      "label": "Calhoun County",
      "fips": "01015"
    },
    {
      "label": "Chambers County",
      "fips": "01017"
    },
    {
      "label": "Cherokee County",
      "fips": "01019"
    },
    {
      "label": "Chilton County",
      "fips": "01021"
    },
    {
      "label": "Choctaw County",
      "fips": "01023"
    },
    {
      "label": "Clarke County",
      "fips": "01025"
    },
    {
      "label": "Clay County",
      "fips": "01027"
    },
    {
      "label": "Cleburne County",
      "fips": "01029"
    },
    {
      "label": "Coffee County",
      "fips": "01031"
    },
    {
      "label": "Colbert County",
      "fips": "01033"
    },
    {
      "label": "Conecuh County",
      "fips": "01035"
    },
    {
      "label": "Coosa County",
      "fips": "01037"
    },
    {
      "label": "Covington County",
      "fips": "01039"
    },
    {
      "label": "Crenshaw County",
      "fips": "01041"
    },
    {
      "label": "Cullman County",
      "fips": "01043"
    },
    {
      "label": "Dale County",
      "fips": "01045"
    },
    {
      "label": "Dallas County",
      "fips": "01047"
    },
    {
      "label": "DeKalb County",
      "fips": "01049"
    },
    {
      "label": "Elmore County",
      "fips": "01051"
    },
    {
      "label": "Escambia County",
      "fips": "01053"
    },
    {
      "label": "Etowah County",
      "fips": "01055"
    },
    {
      "label": "Fayette County",
      "fips": "01057"
    },
    {
      "label": "Franklin County",
      "fips": "01059"
    },
    {
      "label": "Geneva County",
      "fips": "01061"
    },
    {
      "label": "Greene County",
      "fips": "01063"
    },
    {
      "label": "Hale County",
      "fips": "01065"
    },
    {
      "label": "Henry County",
      "fips": "01067"
    },
    {
      "label": "Houston County",
      "fips": "01069"
    },
    {
      "label": "Jackson County",
      "fips": "01071"
    },
    {
      "label": "Jefferson County",
      "fips": "01073"
    },
    {
      "label": "Lamar County",
      "fips": "01075"
    },
    {
      "label": "Lauderdale County",
      "fips": "01077"
    },
    {
      "label": "Lawrence County",
      "fips": "01079"
    },
    {
      "label": "Lee County",
      "fips": "01081"
    },
    {
      "label": "Limestone County",
      "fips": "01083"
    },
    {
      "label": "Lowndes County",
      "fips": "01085"
    },
    {
      "label": "Macon County",
      "fips": "01087"
    },
    {
      "label": "Madison County",
      "fips": "01089"
    },
    {
      "label": "Marengo County",
      "fips": "01091"
    },
    {
      "label": "Marion County",
      "fips": "01093"
    },
    {
      "label": "Marshall County",
      "fips": "01095"
    },
    {
      "label": "Mobile County",
      "fips": "01097"
    },
    {
      "label": "Monroe County",
      "fips": "01099"
    },
    {
      "label": "Montgomery County",
      "fips": "01101"
    },
    {
      "label": "Morgan County",
      "fips": "01103"
    },
    {
      "label": "Perry County",
      "fips": "01105"
    },
    {
      "label": "Pickens County",
      "fips": "01107"
    },
    {
      "label": "Pike County",
      "fips": "01109"
    },
    {
      "label": "Randolph County",
      "fips": "01111"
    },
    {
      "label": "Russell County",
      "fips": "01113"
    },
    {
      "label": "St. Clair County",
      "fips": "01115"
    },
    {
      "label": "Shelby County",
      "fips": "01117"
    },
    {
      "label": "Sumter County",
      "fips": "01119"
    },
    {
      "label": "Talladega County",
      "fips": "01121"
    },
    {
      "label": "Tallapoosa County",
      "fips": "01123"
    },
    {
      "label": "Tuscaloosa County",
      "fips": "01125"
    },
    {
      "label": "Walker County",
      "fips": "01127"
    },
    {
      "label": "Washington County",
      "fips": "01129"
    },
    {
      "label": "Wilcox County",
      "fips": "01131"
    },
    {
      "label": "Winston County",
      "fips": "01133"
    }
  ],
  "AZ": [
    {
      "label": "Apache County",
      "fips": "04001"
    },
    {
      "label": "Cochise County",
      "fips": "04003"
    },
    {
      "label": "Coconino County",
      "fips": "04005"
    },
    {
      "label": "Gila County",
      "fips": "04007"
    },
    {
      "label": "Graham County",
      "fips": "04009"
    },
    {
      "label": "Greenlee County",
      "fips": "04011"
    },
    {
      "label": "La Paz County",
      "fips": "04012"
    },
    {
      "label": "Maricopa County",
      "fips": "04013"
    },
    {
      "label": "Mohave County",
      "fips": "04015"
    },
    {
      "label": "Navajo County",
      "fips": "04017"
    },
    {
      "label": "Pima County",
      "fips": "04019"
    },
    {
      "label": "Pinal County",
      "fips": "04021"
    },
    {
      "label": "Santa Cruz County",
      "fips": "04023"
    },
    {
      "label": "Yavapai County",
      "fips": "04025"
    },
    {
      "label": "Yuma County",
      "fips": "04027"
    }
  ],
  "AR": [
    {
      "label": "Arkansas County",
      "fips": "05001"
    },
    {
      "label": "Ashley County",
      "fips": "05003"
    },
    {
      "label": "Baxter County",
      "fips": "05005"
    },
    {
      "label": "Benton County",
      "fips": "05007"
    },
    {
      "label": "Boone County",
      "fips": "05009"
    },
    {
      "label": "Bradley County",
      "fips": "05011"
    },
    {
      "label": "Calhoun County",
      "fips": "05013"
    },
    {
      "label": "Carroll County",
      "fips": "05015"
    },
    {
      "label": "Chicot County",
      "fips": "05017"
    },
    {
      "label": "Clark County",
      "fips": "05019"
    },
    {
      "label": "Clay County",
      "fips": "05021"
    },
    {
      "label": "Cleburne County",
      "fips": "05023"
    },
    {
      "label": "Cleveland County",
      "fips": "05025"
    },
    {
      "label": "Columbia County",
      "fips": "05027"
    },
    {
      "label": "Conway County",
      "fips": "05029"
    },
    {
      "label": "Craighead County",
      "fips": "05031"
    },
    {
      "label": "Crawford County",
      "fips": "05033"
    },
    {
      "label": "Crittenden County",
      "fips": "05035"
    },
    {
      "label": "Cross County",
      "fips": "05037"
    },
    {
      "label": "Dallas County",
      "fips": "05039"
    },
    {
      "label": "Desha County",
      "fips": "05041"
    },
    {
      "label": "Drew County",
      "fips": "05043"
    },
    {
      "label": "Faulkner County",
      "fips": "05045"
    },
    {
      "label": "Franklin County",
      "fips": "05047"
    },
    {
      "label": "Fulton County",
      "fips": "05049"
    },
    {
      "label": "Garland County",
      "fips": "05051"
    },
    {
      "label": "Grant County",
      "fips": "05053"
    },
    {
      "label": "Greene County",
      "fips": "05055"
    },
    {
      "label": "Hempstead County",
      "fips": "05057"
    },
    {
      "label": "Hot Spring County",
      "fips": "05059"
    },
    {
      "label": "Howard County",
      "fips": "05061"
    },
    {
      "label": "Independence County",
      "fips": "05063"
    },
    {
      "label": "Izard County",
      "fips": "05065"
    },
    {
      "label": "Jackson County",
      "fips": "05067"
    },
    {
      "label": "Jefferson County",
      "fips": "05069"
    },
    {
      "label": "Johnson County",
      "fips": "05071"
    },
    {
      "label": "Lafayette County",
      "fips": "05073"
    },
    {
      "label": "Lawrence County",
      "fips": "05075"
    },
    {
      "label": "Lee County",
      "fips": "05077"
    },
    {
      "label": "Lincoln County",
      "fips": "05079"
    },
    {
      "label": "Little River County",
      "fips": "05081"
    },
    {
      "label": "Logan County",
      "fips": "05083"
    },
    {
      "label": "Lonoke County",
      "fips": "05085"
    },
    {
      "label": "Madison County",
      "fips": "05087"
    },
    {
      "label": "Marion County",
      "fips": "05089"
    },
    {
      "label": "Miller County",
      "fips": "05091"
    },
    {
      "label": "Mississippi County",
      "fips": "05093"
    },
    {
      "label": "Monroe County",
      "fips": "05095"
    },
    {
      "label": "Montgomery County",
      "fips": "05097"
    },
    {
      "label": "Nevada County",
      "fips": "05099"
    },
    {
      "label": "Newton County",
      "fips": "05101"
    },
    {
      "label": "Ouachita County",
      "fips": "05103"
    },
    {
      "label": "Perry County",
      "fips": "05105"
    },
    {
      "label": "Phillips County",
      "fips": "05107"
    },
    {
      "label": "Pike County",
      "fips": "05109"
    },
    {
      "label": "Poinsett County",
      "fips": "05111"
    },
    {
      "label": "Polk County",
      "fips": "05113"
    },
    {
      "label": "Pope County",
      "fips": "05115"
    },
    {
      "label": "Prairie County",
      "fips": "05117"
    },
    {
      "label": "Pulaski County",
      "fips": "05119"
    },
    {
      "label": "Randolph County",
      "fips": "05121"
    },
    {
      "label": "St. Francis County",
      "fips": "05123"
    },
    {
      "label": "Saline County",
      "fips": "05125"
    },
    {
      "label": "Scott County",
      "fips": "05127"
    },
    {
      "label": "Searcy County",
      "fips": "05129"
    },
    {
      "label": "Sebastian County",
      "fips": "05131"
    },
    {
      "label": "Sevier County",
      "fips": "05133"
    },
    {
      "label": "Sharp County",
      "fips": "05135"
    },
    {
      "label": "Stone County",
      "fips": "05137"
    },
    {
      "label": "Union County",
      "fips": "05139"
    },
    {
      "label": "Van Buren County",
      "fips": "05141"
    },
    {
      "label": "Washington County",
      "fips": "05143"
    },
    {
      "label": "White County",
      "fips": "05145"
    },
    {
      "label": "Woodruff County",
      "fips": "05147"
    },
    {
      "label": "Yell County",
      "fips": "05149"
    }
  ],
  "CA": [
    {
      "label": "Alameda County",
      "fips": "06001"
    },
    {
      "label": "Alpine County",
      "fips": "06003"
    },
    {
      "label": "Amador County",
      "fips": "06005"
    },
    {
      "label": "Butte County",
      "fips": "06007"
    },
    {
      "label": "Calaveras County",
      "fips": "06009"
    },
    {
      "label": "Colusa County",
      "fips": "06011"
    },
    {
      "label": "Contra Costa County",
      "fips": "06013"
    },
    {
      "label": "Del Norte County",
      "fips": "06015"
    },
    {
      "label": "El Dorado County",
      "fips": "06017"
    },
    {
      "label": "Fresno County",
      "fips": "06019"
    },
    {
      "label": "Glenn County",
      "fips": "06021"
    },
    {
      "label": "Humboldt County",
      "fips": "06023"
    },
    {
      "label": "Imperial County",
      "fips": "06025"
    },
    {
      "label": "Inyo County",
      "fips": "06027"
    },
    {
      "label": "Kern County",
      "fips": "06029"
    },
    {
      "label": "Kings County",
      "fips": "06031"
    },
    {
      "label": "Lake County",
      "fips": "06033"
    },
    {
      "label": "Lassen County",
      "fips": "06035"
    },
    {
      "label": "Los Angeles County",
      "fips": "06037"
    },
    {
      "label": "Madera County",
      "fips": "06039"
    },
    {
      "label": "Marin County",
      "fips": "06041"
    },
    {
      "label": "Mariposa County",
      "fips": "06043"
    },
    {
      "label": "Mendocino County",
      "fips": "06045"
    },
    {
      "label": "Merced County",
      "fips": "06047"
    },
    {
      "label": "Modoc County",
      "fips": "06049"
    },
    {
      "label": "Mono County",
      "fips": "06051"
    },
    {
      "label": "Monterey County",
      "fips": "06053"
    },
    {
      "label": "Napa County",
      "fips": "06055"
    },
    {
      "label": "Nevada County",
      "fips": "06057"
    },
    {
      "label": "Orange County",
      "fips": "06059"
    },
    {
      "label": "Placer County",
      "fips": "06061"
    },
    {
      "label": "Plumas County",
      "fips": "06063"
    },
    {
      "label": "Riverside County",
      "fips": "06065"
    },
    {
      "label": "Sacramento County",
      "fips": "06067"
    },
    {
      "label": "San Benito County",
      "fips": "06069"
    },
    {
      "label": "San Bernardino County",
      "fips": "06071"
    },
    {
      "label": "San Diego County",
      "fips": "06073"
    },
    {
      "label": "San Francisco County",
      "fips": "06075"
    },
    {
      "label": "San Joaquin County",
      "fips": "06077"
    },
    {
      "label": "San Luis Obispo County",
      "fips": "06079"
    },
    {
      "label": "San Mateo County",
      "fips": "06081"
    },
    {
      "label": "Santa Barbara County",
      "fips": "06083"
    },
    {
      "label": "Santa Clara County",
      "fips": "06085"
    },
    {
      "label": "Santa Cruz County",
      "fips": "06087"
    },
    {
      "label": "Shasta County",
      "fips": "06089"
    },
    {
      "label": "Sierra County",
      "fips": "06091"
    },
    {
      "label": "Siskiyou County",
      "fips": "06093"
    },
    {
      "label": "Solano County",
      "fips": "06095"
    },
    {
      "label": "Sonoma County",
      "fips": "06097"
    },
    {
      "label": "Stanislaus County",
      "fips": "06099"
    },
    {
      "label": "Sutter County",
      "fips": "06101"
    },
    {
      "label": "Tehama County",
      "fips": "06103"
    },
    {
      "label": "Trinity County",
      "fips": "06105"
    },
    {
      "label": "Tulare County",
      "fips": "06107"
    },
    {
      "label": "Tuolumne County",
      "fips": "06109"
    },
    {
      "label": "Ventura County",
      "fips": "06111"
    },
    {
      "label": "Yolo County",
      "fips": "06113"
    },
    {
      "label": "Yuba County",
      "fips": "06115"
    }
  ],
  "CO": [
    {
      "label": "Adams County",
      "fips": "08001"
    },
    {
      "label": "Alamosa County",
      "fips": "08003"
    },
    {
      "label": "Arapahoe County",
      "fips": "08005"
    },
    {
      "label": "Archuleta County",
      "fips": "08007"
    },
    {
      "label": "Baca County",
      "fips": "08009"
    },
    {
      "label": "Bent County",
      "fips": "08011"
    },
    {
      "label": "Boulder County",
      "fips": "08013"
    },
    {
      "label": "Broomfield County",
      "fips": "08014"
    },
    {
      "label": "Chaffee County",
      "fips": "08015"
    },
    {
      "label": "Cheyenne County",
      "fips": "08017"
    },
    {
      "label": "Clear Creek County",
      "fips": "08019"
    },
    {
      "label": "Conejos County",
      "fips": "08021"
    },
    {
      "label": "Costilla County",
      "fips": "08023"
    },
    {
      "label": "Crowley County",
      "fips": "08025"
    },
    {
      "label": "Custer County",
      "fips": "08027"
    },
    {
      "label": "Delta County",
      "fips": "08029"
    },
    {
      "label": "Denver County",
      "fips": "08031"
    },
    {
      "label": "Dolores County",
      "fips": "08033"
    },
    {
      "label": "Douglas County",
      "fips": "08035"
    },
    {
      "label": "Eagle County",
      "fips": "08037"
    },
    {
      "label": "Elbert County",
      "fips": "08039"
    },
    {
      "label": "El Paso County",
      "fips": "08041"
    },
    {
      "label": "Fremont County",
      "fips": "08043"
    },
    {
      "label": "Garfield County",
      "fips": "08045"
    },
    {
      "label": "Gilpin County",
      "fips": "08047"
    },
    {
      "label": "Grand County",
      "fips": "08049"
    },
    {
      "label": "Gunnison County",
      "fips": "08051"
    },
    {
      "label": "Hinsdale County",
      "fips": "08053"
    },
    {
      "label": "Huerfano County",
      "fips": "08055"
    },
    {
      "label": "Jackson County",
      "fips": "08057"
    },
    {
      "label": "Jefferson County",
      "fips": "08059"
    },
    {
      "label": "Kiowa County",
      "fips": "08061"
    },
    {
      "label": "Kit Carson County",
      "fips": "08063"
    },
    {
      "label": "Lake County",
      "fips": "08065"
    },
    {
      "label": "La Plata County",
      "fips": "08067"
    },
    {
      "label": "Larimer County",
      "fips": "08069"
    },
    {
      "label": "Las Animas County",
      "fips": "08071"
    },
    {
      "label": "Lincoln County",
      "fips": "08073"
    },
    {
      "label": "Logan County",
      "fips": "08075"
    },
    {
      "label": "Mesa County",
      "fips": "08077"
    },
    {
      "label": "Mineral County",
      "fips": "08079"
    },
    {
      "label": "Moffat County",
      "fips": "08081"
    },
    {
      "label": "Montezuma County",
      "fips": "08083"
    },
    {
      "label": "Montrose County",
      "fips": "08085"
    },
    {
      "label": "Morgan County",
      "fips": "08087"
    },
    {
      "label": "Otero County",
      "fips": "08089"
    },
    {
      "label": "Ouray County",
      "fips": "08091"
    },
    {
      "label": "Park County",
      "fips": "08093"
    },
    {
      "label": "Phillips County",
      "fips": "08095"
    },
    {
      "label": "Pitkin County",
      "fips": "08097"
    },
    {
      "label": "Prowers County",
      "fips": "08099"
    },
    {
      "label": "Pueblo County",
      "fips": "08101"
    },
    {
      "label": "Rio Blanco County",
      "fips": "08103"
    },
    {
      "label": "Rio Grande County",
      "fips": "08105"
    },
    {
      "label": "Routt County",
      "fips": "08107"
    },
    {
      "label": "Saguache County",
      "fips": "08109"
    },
    {
      "label": "San Juan County",
      "fips": "08111"
    },
    {
      "label": "San Miguel County",
      "fips": "08113"
    },
    {
      "label": "Sedgwick County",
      "fips": "08115"
    },
    {
      "label": "Summit County",
      "fips": "08117"
    },
    {
      "label": "Teller County",
      "fips": "08119"
    },
    {
      "label": "Washington County",
      "fips": "08121"
    },
    {
      "label": "Weld County",
      "fips": "08123"
    },
    {
      "label": "Yuma County",
      "fips": "08125"
    }
  ],
  "CT": [
    {
      "label": "Fairfield County",
      "fips": "09001"
    },
    {
      "label": "Hartford County",
      "fips": "09003"
    },
    {
      "label": "Litchfield County",
      "fips": "09005"
    },
    {
      "label": "Middlesex County",
      "fips": "09007"
    },
    {
      "label": "New Haven County",
      "fips": "09009"
    },
    {
      "label": "New London County",
      "fips": "09011"
    },
    {
      "label": "Tolland County",
      "fips": "09013"
    },
    {
      "label": "Windham County",
      "fips": "09015"
    }
  ],
  "DE": [
    {
      "label": "Kent County",
      "fips": "10001"
    },
    {
      "label": "New Castle County",
      "fips": "10003"
    },
    {
      "label": "Sussex County",
      "fips": "10005"
    }
  ],
  "DC": [
    {
      "label": "District of Columbia",
      "fips": "11001"
    }
  ],
  "FL": [
    {
      "label": "Alachua County",
      "fips": "12001"
    },
    {
      "label": "Baker County",
      "fips": "12003"
    },
    {
      "label": "Bay County",
      "fips": "12005"
    },
    {
      "label": "Bradford County",
      "fips": "12007"
    },
    {
      "label": "Brevard County",
      "fips": "12009"
    },
    {
      "label": "Broward County",
      "fips": "12011"
    },
    {
      "label": "Calhoun County",
      "fips": "12013"
    },
    {
      "label": "Charlotte County",
      "fips": "12015"
    },
    {
      "label": "Citrus County",
      "fips": "12017"
    },
    {
      "label": "Clay County",
      "fips": "12019"
    },
    {
      "label": "Collier County",
      "fips": "12021"
    },
    {
      "label": "Columbia County",
      "fips": "12023"
    },
    {
      "label": "DeSoto County",
      "fips": "12027"
    },
    {
      "label": "Dixie County",
      "fips": "12029"
    },
    {
      "label": "Duval County",
      "fips": "12031"
    },
    {
      "label": "Escambia County",
      "fips": "12033"
    },
    {
      "label": "Flagler County",
      "fips": "12035"
    },
    {
      "label": "Franklin County",
      "fips": "12037"
    },
    {
      "label": "Gadsden County",
      "fips": "12039"
    },
    {
      "label": "Gilchrist County",
      "fips": "12041"
    },
    {
      "label": "Glades County",
      "fips": "12043"
    },
    {
      "label": "Gulf County",
      "fips": "12045"
    },
    {
      "label": "Hamilton County",
      "fips": "12047"
    },
    {
      "label": "Hardee County",
      "fips": "12049"
    },
    {
      "label": "Hendry County",
      "fips": "12051"
    },
    {
      "label": "Hernando County",
      "fips": "12053"
    },
    {
      "label": "Highlands County",
      "fips": "12055"
    },
    {
      "label": "Hillsborough County",
      "fips": "12057"
    },
    {
      "label": "Holmes County",
      "fips": "12059"
    },
    {
      "label": "Indian River County",
      "fips": "12061"
    },
    {
      "label": "Jackson County",
      "fips": "12063"
    },
    {
      "label": "Jefferson County",
      "fips": "12065"
    },
    {
      "label": "Lafayette County",
      "fips": "12067"
    },
    {
      "label": "Lake County",
      "fips": "12069"
    },
    {
      "label": "Lee County",
      "fips": "12071"
    },
    {
      "label": "Leon County",
      "fips": "12073"
    },
    {
      "label": "Levy County",
      "fips": "12075"
    },
    {
      "label": "Liberty County",
      "fips": "12077"
    },
    {
      "label": "Madison County",
      "fips": "12079"
    },
    {
      "label": "Manatee County",
      "fips": "12081"
    },
    {
      "label": "Marion County",
      "fips": "12083"
    },
    {
      "label": "Martin County",
      "fips": "12085"
    },
    {
      "label": "Miami-Dade County",
      "fips": "12086"
    },
    {
      "label": "Monroe County",
      "fips": "12087"
    },
    {
      "label": "Nassau County",
      "fips": "12089"
    },
    {
      "label": "Okaloosa County",
      "fips": "12091"
    },
    {
      "label": "Okeechobee County",
      "fips": "12093"
    },
    {
      "label": "Orange County",
      "fips": "12095"
    },
    {
      "label": "Osceola County",
      "fips": "12097"
    },
    {
      "label": "Palm Beach County",
      "fips": "12099"
    },
    {
      "label": "Pasco County",
      "fips": "12101"
    },
    {
      "label": "Pinellas County",
      "fips": "12103"
    },
    {
      "label": "Polk County",
      "fips": "12105"
    },
    {
      "label": "Putnam County",
      "fips": "12107"
    },
    {
      "label": "St. Johns County",
      "fips": "12109"
    },
    {
      "label": "St. Lucie County",
      "fips": "12111"
    },
    {
      "label": "Santa Rosa County",
      "fips": "12113"
    },
    {
      "label": "Sarasota County",
      "fips": "12115"
    },
    {
      "label": "Seminole County",
      "fips": "12117"
    },
    {
      "label": "Sumter County",
      "fips": "12119"
    },
    {
      "label": "Suwannee County",
      "fips": "12121"
    },
    {
      "label": "Taylor County",
      "fips": "12123"
    },
    {
      "label": "Union County",
      "fips": "12125"
    },
    {
      "label": "Volusia County",
      "fips": "12127"
    },
    {
      "label": "Wakulla County",
      "fips": "12129"
    },
    {
      "label": "Walton County",
      "fips": "12131"
    },
    {
      "label": "Washington County",
      "fips": "12133"
    }
  ],
  "GA": [
    {
      "label": "Appling County",
      "fips": "13001"
    },
    {
      "label": "Atkinson County",
      "fips": "13003"
    },
    {
      "label": "Bacon County",
      "fips": "13005"
    },
    {
      "label": "Baker County",
      "fips": "13007"
    },
    {
      "label": "Baldwin County",
      "fips": "13009"
    },
    {
      "label": "Banks County",
      "fips": "13011"
    },
    {
      "label": "Barrow County",
      "fips": "13013"
    },
    {
      "label": "Bartow County",
      "fips": "13015"
    },
    {
      "label": "Ben Hill County",
      "fips": "13017"
    },
    {
      "label": "Berrien County",
      "fips": "13019"
    },
    {
      "label": "Bibb County",
      "fips": "13021"
    },
    {
      "label": "Bleckley County",
      "fips": "13023"
    },
    {
      "label": "Brantley County",
      "fips": "13025"
    },
    {
      "label": "Brooks County",
      "fips": "13027"
    },
    {
      "label": "Bryan County",
      "fips": "13029"
    },
    {
      "label": "Bulloch County",
      "fips": "13031"
    },
    {
      "label": "Burke County",
      "fips": "13033"
    },
    {
      "label": "Butts County",
      "fips": "13035"
    },
    {
      "label": "Calhoun County",
      "fips": "13037"
    },
    {
      "label": "Camden County",
      "fips": "13039"
    },
    {
      "label": "Candler County",
      "fips": "13043"
    },
    {
      "label": "Carroll County",
      "fips": "13045"
    },
    {
      "label": "Catoosa County",
      "fips": "13047"
    },
    {
      "label": "Charlton County",
      "fips": "13049"
    },
    {
      "label": "Chatham County",
      "fips": "13051"
    },
    {
      "label": "Chattahoochee County",
      "fips": "13053"
    },
    {
      "label": "Chattooga County",
      "fips": "13055"
    },
    {
      "label": "Cherokee County",
      "fips": "13057"
    },
    {
      "label": "Clarke County",
      "fips": "13059"
    },
    {
      "label": "Clay County",
      "fips": "13061"
    },
    {
      "label": "Clayton County",
      "fips": "13063"
    },
    {
      "label": "Clinch County",
      "fips": "13065"
    },
    {
      "label": "Cobb County",
      "fips": "13067"
    },
    {
      "label": "Coffee County",
      "fips": "13069"
    },
    {
      "label": "Colquitt County",
      "fips": "13071"
    },
    {
      "label": "Columbia County",
      "fips": "13073"
    },
    {
      "label": "Cook County",
      "fips": "13075"
    },
    {
      "label": "Coweta County",
      "fips": "13077"
    },
    {
      "label": "Crawford County",
      "fips": "13079"
    },
    {
      "label": "Crisp County",
      "fips": "13081"
    },
    {
      "label": "Dade County",
      "fips": "13083"
    },
    {
      "label": "Dawson County",
      "fips": "13085"
    },
    {
      "label": "Decatur County",
      "fips": "13087"
    },
    {
      "label": "DeKalb County",
      "fips": "13089"
    },
    {
      "label": "Dodge County",
      "fips": "13091"
    },
    {
      "label": "Dooly County",
      "fips": "13093"
    },
    {
      "label": "Dougherty County",
      "fips": "13095"
    },
    {
      "label": "Douglas County",
      "fips": "13097"
    },
    {
      "label": "Early County",
      "fips": "13099"
    },
    {
      "label": "Echols County",
      "fips": "13101"
    },
    {
      "label": "Effingham County",
      "fips": "13103"
    },
    {
      "label": "Elbert County",
      "fips": "13105"
    },
    {
      "label": "Emanuel County",
      "fips": "13107"
    },
    {
      "label": "Evans County",
      "fips": "13109"
    },
    {
      "label": "Fannin County",
      "fips": "13111"
    },
    {
      "label": "Fayette County",
      "fips": "13113"
    },
    {
      "label": "Floyd County",
      "fips": "13115"
    },
    {
      "label": "Forsyth County",
      "fips": "13117"
    },
    {
      "label": "Franklin County",
      "fips": "13119"
    },
    {
      "label": "Fulton County",
      "fips": "13121"
    },
    {
      "label": "Gilmer County",
      "fips": "13123"
    },
    {
      "label": "Glascock County",
      "fips": "13125"
    },
    {
      "label": "Glynn County",
      "fips": "13127"
    },
    {
      "label": "Gordon County",
      "fips": "13129"
    },
    {
      "label": "Grady County",
      "fips": "13131"
    },
    {
      "label": "Greene County",
      "fips": "13133"
    },
    {
      "label": "Gwinnett County",
      "fips": "13135"
    },
    {
      "label": "Habersham County",
      "fips": "13137"
    },
    {
      "label": "Hall County",
      "fips": "13139"
    },
    {
      "label": "Hancock County",
      "fips": "13141"
    },
    {
      "label": "Haralson County",
      "fips": "13143"
    },
    {
      "label": "Harris County",
      "fips": "13145"
    },
    {
      "label": "Hart County",
      "fips": "13147"
    },
    {
      "label": "Heard County",
      "fips": "13149"
    },
    {
      "label": "Henry County",
      "fips": "13151"
    },
    {
      "label": "Houston County",
      "fips": "13153"
    },
    {
      "label": "Irwin County",
      "fips": "13155"
    },
    {
      "label": "Jackson County",
      "fips": "13157"
    },
    {
      "label": "Jasper County",
      "fips": "13159"
    },
    {
      "label": "Jeff Davis County",
      "fips": "13161"
    },
    {
      "label": "Jefferson County",
      "fips": "13163"
    },
    {
      "label": "Jenkins County",
      "fips": "13165"
    },
    {
      "label": "Johnson County",
      "fips": "13167"
    },
    {
      "label": "Jones County",
      "fips": "13169"
    },
    {
      "label": "Lamar County",
      "fips": "13171"
    },
    {
      "label": "Lanier County",
      "fips": "13173"
    },
    {
      "label": "Laurens County",
      "fips": "13175"
    },
    {
      "label": "Lee County",
      "fips": "13177"
    },
    {
      "label": "Liberty County",
      "fips": "13179"
    },
    {
      "label": "Lincoln County",
      "fips": "13181"
    },
    {
      "label": "Long County",
      "fips": "13183"
    },
    {
      "label": "Lowndes County",
      "fips": "13185"
    },
    {
      "label": "Lumpkin County",
      "fips": "13187"
    },
    {
      "label": "McDuffie County",
      "fips": "13189"
    },
    {
      "label": "McIntosh County",
      "fips": "13191"
    },
    {
      "label": "Macon County",
      "fips": "13193"
    },
    {
      "label": "Madison County",
      "fips": "13195"
    },
    {
      "label": "Marion County",
      "fips": "13197"
    },
    {
      "label": "Meriwether County",
      "fips": "13199"
    },
    {
      "label": "Miller County",
      "fips": "13201"
    },
    {
      "label": "Mitchell County",
      "fips": "13205"
    },
    {
      "label": "Monroe County",
      "fips": "13207"
    },
    {
      "label": "Montgomery County",
      "fips": "13209"
    },
    {
      "label": "Morgan County",
      "fips": "13211"
    },
    {
      "label": "Murray County",
      "fips": "13213"
    },
    {
      "label": "Muscogee County",
      "fips": "13215"
    },
    {
      "label": "Newton County",
      "fips": "13217"
    },
    {
      "label": "Oconee County",
      "fips": "13219"
    },
    {
      "label": "Oglethorpe County",
      "fips": "13221"
    },
    {
      "label": "Paulding County",
      "fips": "13223"
    },
    {
      "label": "Peach County",
      "fips": "13225"
    },
    {
      "label": "Pickens County",
      "fips": "13227"
    },
    {
      "label": "Pierce County",
      "fips": "13229"
    },
    {
      "label": "Pike County",
      "fips": "13231"
    },
    {
      "label": "Polk County",
      "fips": "13233"
    },
    {
      "label": "Pulaski County",
      "fips": "13235"
    },
    {
      "label": "Putnam County",
      "fips": "13237"
    },
    {
      "label": "Quitman County",
      "fips": "13239"
    },
    {
      "label": "Rabun County",
      "fips": "13241"
    },
    {
      "label": "Randolph County",
      "fips": "13243"
    },
    {
      "label": "Richmond County",
      "fips": "13245"
    },
    {
      "label": "Rockdale County",
      "fips": "13247"
    },
    {
      "label": "Schley County",
      "fips": "13249"
    },
    {
      "label": "Screven County",
      "fips": "13251"
    },
    {
      "label": "Seminole County",
      "fips": "13253"
    },
    {
      "label": "Spalding County",
      "fips": "13255"
    },
    {
      "label": "Stephens County",
      "fips": "13257"
    },
    {
      "label": "Stewart County",
      "fips": "13259"
    },
    {
      "label": "Sumter County",
      "fips": "13261"
    },
    {
      "label": "Talbot County",
      "fips": "13263"
    },
    {
      "label": "Taliaferro County",
      "fips": "13265"
    },
    {
      "label": "Tattnall County",
      "fips": "13267"
    },
    {
      "label": "Taylor County",
      "fips": "13269"
    },
    {
      "label": "Telfair County",
      "fips": "13271"
    },
    {
      "label": "Terrell County",
      "fips": "13273"
    },
    {
      "label": "Thomas County",
      "fips": "13275"
    },
    {
      "label": "Tift County",
      "fips": "13277"
    },
    {
      "label": "Toombs County",
      "fips": "13279"
    },
    {
      "label": "Towns County",
      "fips": "13281"
    },
    {
      "label": "Treutlen County",
      "fips": "13283"
    },
    {
      "label": "Troup County",
      "fips": "13285"
    },
    {
      "label": "Turner County",
      "fips": "13287"
    },
    {
      "label": "Twiggs County",
      "fips": "13289"
    },
    {
      "label": "Union County",
      "fips": "13291"
    },
    {
      "label": "Upson County",
      "fips": "13293"
    },
    {
      "label": "Walker County",
      "fips": "13295"
    },
    {
      "label": "Walton County",
      "fips": "13297"
    },
    {
      "label": "Ware County",
      "fips": "13299"
    },
    {
      "label": "Warren County",
      "fips": "13301"
    },
    {
      "label": "Washington County",
      "fips": "13303"
    },
    {
      "label": "Wayne County",
      "fips": "13305"
    },
    {
      "label": "Webster County",
      "fips": "13307"
    },
    {
      "label": "Wheeler County",
      "fips": "13309"
    },
    {
      "label": "White County",
      "fips": "13311"
    },
    {
      "label": "Whitfield County",
      "fips": "13313"
    },
    {
      "label": "Wilcox County",
      "fips": "13315"
    },
    {
      "label": "Wilkes County",
      "fips": "13317"
    },
    {
      "label": "Wilkinson County",
      "fips": "13319"
    },
    {
      "label": "Worth County",
      "fips": "13321"
    }
  ],
  "ID": [
    {
      "label": "Ada County",
      "fips": "16001"
    },
    {
      "label": "Adams County",
      "fips": "16003"
    },
    {
      "label": "Bannock County",
      "fips": "16005"
    },
    {
      "label": "Bear Lake County",
      "fips": "16007"
    },
    {
      "label": "Benewah County",
      "fips": "16009"
    },
    {
      "label": "Bingham County",
      "fips": "16011"
    },
    {
      "label": "Blaine County",
      "fips": "16013"
    },
    {
      "label": "Boise County",
      "fips": "16015"
    },
    {
      "label": "Bonner County",
      "fips": "16017"
    },
    {
      "label": "Bonneville County",
      "fips": "16019"
    },
    {
      "label": "Boundary County",
      "fips": "16021"
    },
    {
      "label": "Butte County",
      "fips": "16023"
    },
    {
      "label": "Camas County",
      "fips": "16025"
    },
    {
      "label": "Canyon County",
      "fips": "16027"
    },
    {
      "label": "Caribou County",
      "fips": "16029"
    },
    {
      "label": "Cassia County",
      "fips": "16031"
    },
    {
      "label": "Clark County",
      "fips": "16033"
    },
    {
      "label": "Clearwater County",
      "fips": "16035"
    },
    {
      "label": "Custer County",
      "fips": "16037"
    },
    {
      "label": "Elmore County",
      "fips": "16039"
    },
    {
      "label": "Franklin County",
      "fips": "16041"
    },
    {
      "label": "Fremont County",
      "fips": "16043"
    },
    {
      "label": "Gem County",
      "fips": "16045"
    },
    {
      "label": "Gooding County",
      "fips": "16047"
    },
    {
      "label": "Idaho County",
      "fips": "16049"
    },
    {
      "label": "Jefferson County",
      "fips": "16051"
    },
    {
      "label": "Jerome County",
      "fips": "16053"
    },
    {
      "label": "Kootenai County",
      "fips": "16055"
    },
    {
      "label": "Latah County",
      "fips": "16057"
    },
    {
      "label": "Lemhi County",
      "fips": "16059"
    },
    {
      "label": "Lewis County",
      "fips": "16061"
    },
    {
      "label": "Lincoln County",
      "fips": "16063"
    },
    {
      "label": "Madison County",
      "fips": "16065"
    },
    {
      "label": "Minidoka County",
      "fips": "16067"
    },
    {
      "label": "Nez Perce County",
      "fips": "16069"
    },
    {
      "label": "Oneida County",
      "fips": "16071"
    },
    {
      "label": "Owyhee County",
      "fips": "16073"
    },
    {
      "label": "Payette County",
      "fips": "16075"
    },
    {
      "label": "Power County",
      "fips": "16077"
    },
    {
      "label": "Shoshone County",
      "fips": "16079"
    },
    {
      "label": "Teton County",
      "fips": "16081"
    },
    {
      "label": "Twin Falls County",
      "fips": "16083"
    },
    {
      "label": "Valley County",
      "fips": "16085"
    },
    {
      "label": "Washington County",
      "fips": "16087"
    }
  ],
  "IL": [
    {
      "label": "Adams County",
      "fips": "17001"
    },
    {
      "label": "Alexander County",
      "fips": "17003"
    },
    {
      "label": "Bond County",
      "fips": "17005"
    },
    {
      "label": "Boone County",
      "fips": "17007"
    },
    {
      "label": "Brown County",
      "fips": "17009"
    },
    {
      "label": "Bureau County",
      "fips": "17011"
    },
    {
      "label": "Calhoun County",
      "fips": "17013"
    },
    {
      "label": "Carroll County",
      "fips": "17015"
    },
    {
      "label": "Cass County",
      "fips": "17017"
    },
    {
      "label": "Champaign County",
      "fips": "17019"
    },
    {
      "label": "Christian County",
      "fips": "17021"
    },
    {
      "label": "Clark County",
      "fips": "17023"
    },
    {
      "label": "Clay County",
      "fips": "17025"
    },
    {
      "label": "Clinton County",
      "fips": "17027"
    },
    {
      "label": "Coles County",
      "fips": "17029"
    },
    {
      "label": "Cook County",
      "fips": "17031"
    },
    {
      "label": "Crawford County",
      "fips": "17033"
    },
    {
      "label": "Cumberland County",
      "fips": "17035"
    },
    {
      "label": "DeKalb County",
      "fips": "17037"
    },
    {
      "label": "De Witt County",
      "fips": "17039"
    },
    {
      "label": "Douglas County",
      "fips": "17041"
    },
    {
      "label": "DuPage County",
      "fips": "17043"
    },
    {
      "label": "Edgar County",
      "fips": "17045"
    },
    {
      "label": "Edwards County",
      "fips": "17047"
    },
    {
      "label": "Effingham County",
      "fips": "17049"
    },
    {
      "label": "Fayette County",
      "fips": "17051"
    },
    {
      "label": "Ford County",
      "fips": "17053"
    },
    {
      "label": "Franklin County",
      "fips": "17055"
    },
    {
      "label": "Fulton County",
      "fips": "17057"
    },
    {
      "label": "Gallatin County",
      "fips": "17059"
    },
    {
      "label": "Greene County",
      "fips": "17061"
    },
    {
      "label": "Grundy County",
      "fips": "17063"
    },
    {
      "label": "Hamilton County",
      "fips": "17065"
    },
    {
      "label": "Hancock County",
      "fips": "17067"
    },
    {
      "label": "Hardin County",
      "fips": "17069"
    },
    {
      "label": "Henderson County",
      "fips": "17071"
    },
    {
      "label": "Henry County",
      "fips": "17073"
    },
    {
      "label": "Iroquois County",
      "fips": "17075"
    },
    {
      "label": "Jackson County",
      "fips": "17077"
    },
    {
      "label": "Jasper County",
      "fips": "17079"
    },
    {
      "label": "Jefferson County",
      "fips": "17081"
    },
    {
      "label": "Jersey County",
      "fips": "17083"
    },
    {
      "label": "Jo Daviess County",
      "fips": "17085"
    },
    {
      "label": "Johnson County",
      "fips": "17087"
    },
    {
      "label": "Kane County",
      "fips": "17089"
    },
    {
      "label": "Kankakee County",
      "fips": "17091"
    },
    {
      "label": "Kendall County",
      "fips": "17093"
    },
    {
      "label": "Knox County",
      "fips": "17095"
    },
    {
      "label": "Lake County",
      "fips": "17097"
    },
    {
      "label": "LaSalle County",
      "fips": "17099"
    },
    {
      "label": "Lawrence County",
      "fips": "17101"
    },
    {
      "label": "Lee County",
      "fips": "17103"
    },
    {
      "label": "Livingston County",
      "fips": "17105"
    },
    {
      "label": "Logan County",
      "fips": "17107"
    },
    {
      "label": "McDonough County",
      "fips": "17109"
    },
    {
      "label": "McHenry County",
      "fips": "17111"
    },
    {
      "label": "McLean County",
      "fips": "17113"
    },
    {
      "label": "Macon County",
      "fips": "17115"
    },
    {
      "label": "Macoupin County",
      "fips": "17117"
    },
    {
      "label": "Madison County",
      "fips": "17119"
    },
    {
      "label": "Marion County",
      "fips": "17121"
    },
    {
      "label": "Marshall County",
      "fips": "17123"
    },
    {
      "label": "Mason County",
      "fips": "17125"
    },
    {
      "label": "Massac County",
      "fips": "17127"
    },
    {
      "label": "Menard County",
      "fips": "17129"
    },
    {
      "label": "Mercer County",
      "fips": "17131"
    },
    {
      "label": "Monroe County",
      "fips": "17133"
    },
    {
      "label": "Montgomery County",
      "fips": "17135"
    },
    {
      "label": "Morgan County",
      "fips": "17137"
    },
    {
      "label": "Moultrie County",
      "fips": "17139"
    },
    {
      "label": "Ogle County",
      "fips": "17141"
    },
    {
      "label": "Peoria County",
      "fips": "17143"
    },
    {
      "label": "Perry County",
      "fips": "17145"
    },
    {
      "label": "Piatt County",
      "fips": "17147"
    },
    {
      "label": "Pike County",
      "fips": "17149"
    },
    {
      "label": "Pope County",
      "fips": "17151"
    },
    {
      "label": "Pulaski County",
      "fips": "17153"
    },
    {
      "label": "Putnam County",
      "fips": "17155"
    },
    {
      "label": "Randolph County",
      "fips": "17157"
    },
    {
      "label": "Richland County",
      "fips": "17159"
    },
    {
      "label": "Rock Island County",
      "fips": "17161"
    },
    {
      "label": "St. Clair County",
      "fips": "17163"
    },
    {
      "label": "Saline County",
      "fips": "17165"
    },
    {
      "label": "Sangamon County",
      "fips": "17167"
    },
    {
      "label": "Schuyler County",
      "fips": "17169"
    },
    {
      "label": "Scott County",
      "fips": "17171"
    },
    {
      "label": "Shelby County",
      "fips": "17173"
    },
    {
      "label": "Stark County",
      "fips": "17175"
    },
    {
      "label": "Stephenson County",
      "fips": "17177"
    },
    {
      "label": "Tazewell County",
      "fips": "17179"
    },
    {
      "label": "Union County",
      "fips": "17181"
    },
    {
      "label": "Vermilion County",
      "fips": "17183"
    },
    {
      "label": "Wabash County",
      "fips": "17185"
    },
    {
      "label": "Warren County",
      "fips": "17187"
    },
    {
      "label": "Washington County",
      "fips": "17189"
    },
    {
      "label": "Wayne County",
      "fips": "17191"
    },
    {
      "label": "White County",
      "fips": "17193"
    },
    {
      "label": "Whiteside County",
      "fips": "17195"
    },
    {
      "label": "Will County",
      "fips": "17197"
    },
    {
      "label": "Williamson County",
      "fips": "17199"
    },
    {
      "label": "Winnebago County",
      "fips": "17201"
    },
    {
      "label": "Woodford County",
      "fips": "17203"
    }
  ],
  "IN": [
    {
      "label": "Adams County",
      "fips": "18001"
    },
    {
      "label": "Allen County",
      "fips": "18003"
    },
    {
      "label": "Bartholomew County",
      "fips": "18005"
    },
    {
      "label": "Benton County",
      "fips": "18007"
    },
    {
      "label": "Blackford County",
      "fips": "18009"
    },
    {
      "label": "Boone County",
      "fips": "18011"
    },
    {
      "label": "Brown County",
      "fips": "18013"
    },
    {
      "label": "Carroll County",
      "fips": "18015"
    },
    {
      "label": "Cass County",
      "fips": "18017"
    },
    {
      "label": "Clark County",
      "fips": "18019"
    },
    {
      "label": "Clay County",
      "fips": "18021"
    },
    {
      "label": "Clinton County",
      "fips": "18023"
    },
    {
      "label": "Crawford County",
      "fips": "18025"
    },
    {
      "label": "Daviess County",
      "fips": "18027"
    },
    {
      "label": "Dearborn County",
      "fips": "18029"
    },
    {
      "label": "Decatur County",
      "fips": "18031"
    },
    {
      "label": "DeKalb County",
      "fips": "18033"
    },
    {
      "label": "Delaware County",
      "fips": "18035"
    },
    {
      "label": "Dubois County",
      "fips": "18037"
    },
    {
      "label": "Elkhart County",
      "fips": "18039"
    },
    {
      "label": "Fayette County",
      "fips": "18041"
    },
    {
      "label": "Floyd County",
      "fips": "18043"
    },
    {
      "label": "Fountain County",
      "fips": "18045"
    },
    {
      "label": "Franklin County",
      "fips": "18047"
    },
    {
      "label": "Fulton County",
      "fips": "18049"
    },
    {
      "label": "Gibson County",
      "fips": "18051"
    },
    {
      "label": "Grant County",
      "fips": "18053"
    },
    {
      "label": "Greene County",
      "fips": "18055"
    },
    {
      "label": "Hamilton County",
      "fips": "18057"
    },
    {
      "label": "Hancock County",
      "fips": "18059"
    },
    {
      "label": "Harrison County",
      "fips": "18061"
    },
    {
      "label": "Hendricks County",
      "fips": "18063"
    },
    {
      "label": "Henry County",
      "fips": "18065"
    },
    {
      "label": "Howard County",
      "fips": "18067"
    },
    {
      "label": "Huntington County",
      "fips": "18069"
    },
    {
      "label": "Jackson County",
      "fips": "18071"
    },
    {
      "label": "Jasper County",
      "fips": "18073"
    },
    {
      "label": "Jay County",
      "fips": "18075"
    },
    {
      "label": "Jefferson County",
      "fips": "18077"
    },
    {
      "label": "Jennings County",
      "fips": "18079"
    },
    {
      "label": "Johnson County",
      "fips": "18081"
    },
    {
      "label": "Knox County",
      "fips": "18083"
    },
    {
      "label": "Kosciusko County",
      "fips": "18085"
    },
    {
      "label": "LaGrange County",
      "fips": "18087"
    },
    {
      "label": "Lake County",
      "fips": "18089"
    },
    {
      "label": "LaPorte County",
      "fips": "18091"
    },
    {
      "label": "Lawrence County",
      "fips": "18093"
    },
    {
      "label": "Madison County",
      "fips": "18095"
    },
    {
      "label": "Marion County",
      "fips": "18097"
    },
    {
      "label": "Marshall County",
      "fips": "18099"
    },
    {
      "label": "Martin County",
      "fips": "18101"
    },
    {
      "label": "Miami County",
      "fips": "18103"
    },
    {
      "label": "Monroe County",
      "fips": "18105"
    },
    {
      "label": "Montgomery County",
      "fips": "18107"
    },
    {
      "label": "Morgan County",
      "fips": "18109"
    },
    {
      "label": "Newton County",
      "fips": "18111"
    },
    {
      "label": "Noble County",
      "fips": "18113"
    },
    {
      "label": "Ohio County",
      "fips": "18115"
    },
    {
      "label": "Orange County",
      "fips": "18117"
    },
    {
      "label": "Owen County",
      "fips": "18119"
    },
    {
      "label": "Parke County",
      "fips": "18121"
    },
    {
      "label": "Perry County",
      "fips": "18123"
    },
    {
      "label": "Pike County",
      "fips": "18125"
    },
    {
      "label": "Porter County",
      "fips": "18127"
    },
    {
      "label": "Posey County",
      "fips": "18129"
    },
    {
      "label": "Pulaski County",
      "fips": "18131"
    },
    {
      "label": "Putnam County",
      "fips": "18133"
    },
    {
      "label": "Randolph County",
      "fips": "18135"
    },
    {
      "label": "Ripley County",
      "fips": "18137"
    },
    {
      "label": "Rush County",
      "fips": "18139"
    },
    {
      "label": "St. Joseph County",
      "fips": "18141"
    },
    {
      "label": "Scott County",
      "fips": "18143"
    },
    {
      "label": "Shelby County",
      "fips": "18145"
    },
    {
      "label": "Spencer County",
      "fips": "18147"
    },
    {
      "label": "Starke County",
      "fips": "18149"
    },
    {
      "label": "Steuben County",
      "fips": "18151"
    },
    {
      "label": "Sullivan County",
      "fips": "18153"
    },
    {
      "label": "Switzerland County",
      "fips": "18155"
    },
    {
      "label": "Tippecanoe County",
      "fips": "18157"
    },
    {
      "label": "Tipton County",
      "fips": "18159"
    },
    {
      "label": "Union County",
      "fips": "18161"
    },
    {
      "label": "Vanderburgh County",
      "fips": "18163"
    },
    {
      "label": "Vermillion County",
      "fips": "18165"
    },
    {
      "label": "Vigo County",
      "fips": "18167"
    },
    {
      "label": "Wabash County",
      "fips": "18169"
    },
    {
      "label": "Warren County",
      "fips": "18171"
    },
    {
      "label": "Warrick County",
      "fips": "18173"
    },
    {
      "label": "Washington County",
      "fips": "18175"
    },
    {
      "label": "Wayne County",
      "fips": "18177"
    },
    {
      "label": "Wells County",
      "fips": "18179"
    },
    {
      "label": "White County",
      "fips": "18181"
    },
    {
      "label": "Whitley County",
      "fips": "18183"
    }
  ],
  "IA": [
    {
      "label": "Adair County",
      "fips": "19001"
    },
    {
      "label": "Adams County",
      "fips": "19003"
    },
    {
      "label": "Allamakee County",
      "fips": "19005"
    },
    {
      "label": "Appanoose County",
      "fips": "19007"
    },
    {
      "label": "Audubon County",
      "fips": "19009"
    },
    {
      "label": "Benton County",
      "fips": "19011"
    },
    {
      "label": "Black Hawk County",
      "fips": "19013"
    },
    {
      "label": "Boone County",
      "fips": "19015"
    },
    {
      "label": "Bremer County",
      "fips": "19017"
    },
    {
      "label": "Buchanan County",
      "fips": "19019"
    },
    {
      "label": "Buena Vista County",
      "fips": "19021"
    },
    {
      "label": "Butler County",
      "fips": "19023"
    },
    {
      "label": "Calhoun County",
      "fips": "19025"
    },
    {
      "label": "Carroll County",
      "fips": "19027"
    },
    {
      "label": "Cass County",
      "fips": "19029"
    },
    {
      "label": "Cedar County",
      "fips": "19031"
    },
    {
      "label": "Cerro Gordo County",
      "fips": "19033"
    },
    {
      "label": "Cherokee County",
      "fips": "19035"
    },
    {
      "label": "Chickasaw County",
      "fips": "19037"
    },
    {
      "label": "Clarke County",
      "fips": "19039"
    },
    {
      "label": "Clay County",
      "fips": "19041"
    },
    {
      "label": "Clayton County",
      "fips": "19043"
    },
    {
      "label": "Clinton County",
      "fips": "19045"
    },
    {
      "label": "Crawford County",
      "fips": "19047"
    },
    {
      "label": "Dallas County",
      "fips": "19049"
    },
    {
      "label": "Davis County",
      "fips": "19051"
    },
    {
      "label": "Decatur County",
      "fips": "19053"
    },
    {
      "label": "Delaware County",
      "fips": "19055"
    },
    {
      "label": "Des Moines County",
      "fips": "19057"
    },
    {
      "label": "Dickinson County",
      "fips": "19059"
    },
    {
      "label": "Dubuque County",
      "fips": "19061"
    },
    {
      "label": "Emmet County",
      "fips": "19063"
    },
    {
      "label": "Fayette County",
      "fips": "19065"
    },
    {
      "label": "Floyd County",
      "fips": "19067"
    },
    {
      "label": "Franklin County",
      "fips": "19069"
    },
    {
      "label": "Fremont County",
      "fips": "19071"
    },
    {
      "label": "Greene County",
      "fips": "19073"
    },
    {
      "label": "Grundy County",
      "fips": "19075"
    },
    {
      "label": "Guthrie County",
      "fips": "19077"
    },
    {
      "label": "Hamilton County",
      "fips": "19079"
    },
    {
      "label": "Hancock County",
      "fips": "19081"
    },
    {
      "label": "Hardin County",
      "fips": "19083"
    },
    {
      "label": "Harrison County",
      "fips": "19085"
    },
    {
      "label": "Henry County",
      "fips": "19087"
    },
    {
      "label": "Howard County",
      "fips": "19089"
    },
    {
      "label": "Humboldt County",
      "fips": "19091"
    },
    {
      "label": "Ida County",
      "fips": "19093"
    },
    {
      "label": "Iowa County",
      "fips": "19095"
    },
    {
      "label": "Jackson County",
      "fips": "19097"
    },
    {
      "label": "Jasper County",
      "fips": "19099"
    },
    {
      "label": "Jefferson County",
      "fips": "19101"
    },
    {
      "label": "Johnson County",
      "fips": "19103"
    },
    {
      "label": "Jones County",
      "fips": "19105"
    },
    {
      "label": "Keokuk County",
      "fips": "19107"
    },
    {
      "label": "Kossuth County",
      "fips": "19109"
    },
    {
      "label": "Lee County",
      "fips": "19111"
    },
    {
      "label": "Linn County",
      "fips": "19113"
    },
    {
      "label": "Louisa County",
      "fips": "19115"
    },
    {
      "label": "Lucas County",
      "fips": "19117"
    },
    {
      "label": "Lyon County",
      "fips": "19119"
    },
    {
      "label": "Madison County",
      "fips": "19121"
    },
    {
      "label": "Mahaska County",
      "fips": "19123"
    },
    {
      "label": "Marion County",
      "fips": "19125"
    },
    {
      "label": "Marshall County",
      "fips": "19127"
    },
    {
      "label": "Mills County",
      "fips": "19129"
    },
    {
      "label": "Mitchell County",
      "fips": "19131"
    },
    {
      "label": "Monona County",
      "fips": "19133"
    },
    {
      "label": "Monroe County",
      "fips": "19135"
    },
    {
      "label": "Montgomery County",
      "fips": "19137"
    },
    {
      "label": "Muscatine County",
      "fips": "19139"
    },
    {
      "label": "O'Brien County",
      "fips": "19141"
    },
    {
      "label": "Osceola County",
      "fips": "19143"
    },
    {
      "label": "Page County",
      "fips": "19145"
    },
    {
      "label": "Palo Alto County",
      "fips": "19147"
    },
    {
      "label": "Plymouth County",
      "fips": "19149"
    },
    {
      "label": "Pocahontas County",
      "fips": "19151"
    },
    {
      "label": "Polk County",
      "fips": "19153"
    },
    {
      "label": "Pottawattamie County",
      "fips": "19155"
    },
    {
      "label": "Poweshiek County",
      "fips": "19157"
    },
    {
      "label": "Ringgold County",
      "fips": "19159"
    },
    {
      "label": "Sac County",
      "fips": "19161"
    },
    {
      "label": "Scott County",
      "fips": "19163"
    },
    {
      "label": "Shelby County",
      "fips": "19165"
    },
    {
      "label": "Sioux County",
      "fips": "19167"
    },
    {
      "label": "Story County",
      "fips": "19169"
    },
    {
      "label": "Tama County",
      "fips": "19171"
    },
    {
      "label": "Taylor County",
      "fips": "19173"
    },
    {
      "label": "Union County",
      "fips": "19175"
    },
    {
      "label": "Van Buren County",
      "fips": "19177"
    },
    {
      "label": "Wapello County",
      "fips": "19179"
    },
    {
      "label": "Warren County",
      "fips": "19181"
    },
    {
      "label": "Washington County",
      "fips": "19183"
    },
    {
      "label": "Wayne County",
      "fips": "19185"
    },
    {
      "label": "Webster County",
      "fips": "19187"
    },
    {
      "label": "Winnebago County",
      "fips": "19189"
    },
    {
      "label": "Winneshiek County",
      "fips": "19191"
    },
    {
      "label": "Woodbury County",
      "fips": "19193"
    },
    {
      "label": "Worth County",
      "fips": "19195"
    },
    {
      "label": "Wright County",
      "fips": "19197"
    }
  ],
  "KS": [
    {
      "label": "Allen County",
      "fips": "20001"
    },
    {
      "label": "Anderson County",
      "fips": "20003"
    },
    {
      "label": "Atchison County",
      "fips": "20005"
    },
    {
      "label": "Barber County",
      "fips": "20007"
    },
    {
      "label": "Barton County",
      "fips": "20009"
    },
    {
      "label": "Bourbon County",
      "fips": "20011"
    },
    {
      "label": "Brown County",
      "fips": "20013"
    },
    {
      "label": "Butler County",
      "fips": "20015"
    },
    {
      "label": "Chase County",
      "fips": "20017"
    },
    {
      "label": "Chautauqua County",
      "fips": "20019"
    },
    {
      "label": "Cherokee County",
      "fips": "20021"
    },
    {
      "label": "Cheyenne County",
      "fips": "20023"
    },
    {
      "label": "Clark County",
      "fips": "20025"
    },
    {
      "label": "Clay County",
      "fips": "20027"
    },
    {
      "label": "Cloud County",
      "fips": "20029"
    },
    {
      "label": "Coffey County",
      "fips": "20031"
    },
    {
      "label": "Comanche County",
      "fips": "20033"
    },
    {
      "label": "Cowley County",
      "fips": "20035"
    },
    {
      "label": "Crawford County",
      "fips": "20037"
    },
    {
      "label": "Decatur County",
      "fips": "20039"
    },
    {
      "label": "Dickinson County",
      "fips": "20041"
    },
    {
      "label": "Doniphan County",
      "fips": "20043"
    },
    {
      "label": "Douglas County",
      "fips": "20045"
    },
    {
      "label": "Edwards County",
      "fips": "20047"
    },
    {
      "label": "Elk County",
      "fips": "20049"
    },
    {
      "label": "Ellis County",
      "fips": "20051"
    },
    {
      "label": "Ellsworth County",
      "fips": "20053"
    },
    {
      "label": "Finney County",
      "fips": "20055"
    },
    {
      "label": "Ford County",
      "fips": "20057"
    },
    {
      "label": "Franklin County",
      "fips": "20059"
    },
    {
      "label": "Geary County",
      "fips": "20061"
    },
    {
      "label": "Gove County",
      "fips": "20063"
    },
    {
      "label": "Graham County",
      "fips": "20065"
    },
    {
      "label": "Grant County",
      "fips": "20067"
    },
    {
      "label": "Gray County",
      "fips": "20069"
    },
    {
      "label": "Greeley County",
      "fips": "20071"
    },
    {
      "label": "Greenwood County",
      "fips": "20073"
    },
    {
      "label": "Hamilton County",
      "fips": "20075"
    },
    {
      "label": "Harper County",
      "fips": "20077"
    },
    {
      "label": "Harvey County",
      "fips": "20079"
    },
    {
      "label": "Haskell County",
      "fips": "20081"
    },
    {
      "label": "Hodgeman County",
      "fips": "20083"
    },
    {
      "label": "Jackson County",
      "fips": "20085"
    },
    {
      "label": "Jefferson County",
      "fips": "20087"
    },
    {
      "label": "Jewell County",
      "fips": "20089"
    },
    {
      "label": "Johnson County",
      "fips": "20091"
    },
    {
      "label": "Kearny County",
      "fips": "20093"
    },
    {
      "label": "Kingman County",
      "fips": "20095"
    },
    {
      "label": "Kiowa County",
      "fips": "20097"
    },
    {
      "label": "Labette County",
      "fips": "20099"
    },
    {
      "label": "Lane County",
      "fips": "20101"
    },
    {
      "label": "Leavenworth County",
      "fips": "20103"
    },
    {
      "label": "Lincoln County",
      "fips": "20105"
    },
    {
      "label": "Linn County",
      "fips": "20107"
    },
    {
      "label": "Logan County",
      "fips": "20109"
    },
    {
      "label": "Lyon County",
      "fips": "20111"
    },
    {
      "label": "McPherson County",
      "fips": "20113"
    },
    {
      "label": "Marion County",
      "fips": "20115"
    },
    {
      "label": "Marshall County",
      "fips": "20117"
    },
    {
      "label": "Meade County",
      "fips": "20119"
    },
    {
      "label": "Miami County",
      "fips": "20121"
    },
    {
      "label": "Mitchell County",
      "fips": "20123"
    },
    {
      "label": "Montgomery County",
      "fips": "20125"
    },
    {
      "label": "Morris County",
      "fips": "20127"
    },
    {
      "label": "Morton County",
      "fips": "20129"
    },
    {
      "label": "Nemaha County",
      "fips": "20131"
    },
    {
      "label": "Neosho County",
      "fips": "20133"
    },
    {
      "label": "Ness County",
      "fips": "20135"
    },
    {
      "label": "Norton County",
      "fips": "20137"
    },
    {
      "label": "Osage County",
      "fips": "20139"
    },
    {
      "label": "Osborne County",
      "fips": "20141"
    },
    {
      "label": "Ottawa County",
      "fips": "20143"
    },
    {
      "label": "Pawnee County",
      "fips": "20145"
    },
    {
      "label": "Phillips County",
      "fips": "20147"
    },
    {
      "label": "Pottawatomie County",
      "fips": "20149"
    },
    {
      "label": "Pratt County",
      "fips": "20151"
    },
    {
      "label": "Rawlins County",
      "fips": "20153"
    },
    {
      "label": "Reno County",
      "fips": "20155"
    },
    {
      "label": "Republic County",
      "fips": "20157"
    },
    {
      "label": "Rice County",
      "fips": "20159"
    },
    {
      "label": "Riley County",
      "fips": "20161"
    },
    {
      "label": "Rooks County",
      "fips": "20163"
    },
    {
      "label": "Rush County",
      "fips": "20165"
    },
    {
      "label": "Russell County",
      "fips": "20167"
    },
    {
      "label": "Saline County",
      "fips": "20169"
    },
    {
      "label": "Scott County",
      "fips": "20171"
    },
    {
      "label": "Sedgwick County",
      "fips": "20173"
    },
    {
      "label": "Seward County",
      "fips": "20175"
    },
    {
      "label": "Shawnee County",
      "fips": "20177"
    },
    {
      "label": "Sheridan County",
      "fips": "20179"
    },
    {
      "label": "Sherman County",
      "fips": "20181"
    },
    {
      "label": "Smith County",
      "fips": "20183"
    },
    {
      "label": "Stafford County",
      "fips": "20185"
    },
    {
      "label": "Stanton County",
      "fips": "20187"
    },
    {
      "label": "Stevens County",
      "fips": "20189"
    },
    {
      "label": "Sumner County",
      "fips": "20191"
    },
    {
      "label": "Thomas County",
      "fips": "20193"
    },
    {
      "label": "Trego County",
      "fips": "20195"
    },
    {
      "label": "Wabaunsee County",
      "fips": "20197"
    },
    {
      "label": "Wallace County",
      "fips": "20199"
    },
    {
      "label": "Washington County",
      "fips": "20201"
    },
    {
      "label": "Wichita County",
      "fips": "20203"
    },
    {
      "label": "Wilson County",
      "fips": "20205"
    },
    {
      "label": "Woodson County",
      "fips": "20207"
    },
    {
      "label": "Wyandotte County",
      "fips": "20209"
    }
  ],
  "KY": [
    {
      "label": "Adair County",
      "fips": "21001"
    },
    {
      "label": "Allen County",
      "fips": "21003"
    },
    {
      "label": "Anderson County",
      "fips": "21005"
    },
    {
      "label": "Ballard County",
      "fips": "21007"
    },
    {
      "label": "Barren County",
      "fips": "21009"
    },
    {
      "label": "Bath County",
      "fips": "21011"
    },
    {
      "label": "Bell County",
      "fips": "21013"
    },
    {
      "label": "Boone County",
      "fips": "21015"
    },
    {
      "label": "Bourbon County",
      "fips": "21017"
    },
    {
      "label": "Boyd County",
      "fips": "21019"
    },
    {
      "label": "Boyle County",
      "fips": "21021"
    },
    {
      "label": "Bracken County",
      "fips": "21023"
    },
    {
      "label": "Breathitt County",
      "fips": "21025"
    },
    {
      "label": "Breckinridge County",
      "fips": "21027"
    },
    {
      "label": "Bullitt County",
      "fips": "21029"
    },
    {
      "label": "Butler County",
      "fips": "21031"
    },
    {
      "label": "Caldwell County",
      "fips": "21033"
    },
    {
      "label": "Calloway County",
      "fips": "21035"
    },
    {
      "label": "Campbell County",
      "fips": "21037"
    },
    {
      "label": "Carlisle County",
      "fips": "21039"
    },
    {
      "label": "Carroll County",
      "fips": "21041"
    },
    {
      "label": "Carter County",
      "fips": "21043"
    },
    {
      "label": "Casey County",
      "fips": "21045"
    },
    {
      "label": "Christian County",
      "fips": "21047"
    },
    {
      "label": "Clark County",
      "fips": "21049"
    },
    {
      "label": "Clay County",
      "fips": "21051"
    },
    {
      "label": "Clinton County",
      "fips": "21053"
    },
    {
      "label": "Crittenden County",
      "fips": "21055"
    },
    {
      "label": "Cumberland County",
      "fips": "21057"
    },
    {
      "label": "Daviess County",
      "fips": "21059"
    },
    {
      "label": "Edmonson County",
      "fips": "21061"
    },
    {
      "label": "Elliott County",
      "fips": "21063"
    },
    {
      "label": "Estill County",
      "fips": "21065"
    },
    {
      "label": "Fayette County",
      "fips": "21067"
    },
    {
      "label": "Fleming County",
      "fips": "21069"
    },
    {
      "label": "Floyd County",
      "fips": "21071"
    },
    {
      "label": "Franklin County",
      "fips": "21073"
    },
    {
      "label": "Fulton County",
      "fips": "21075"
    },
    {
      "label": "Gallatin County",
      "fips": "21077"
    },
    {
      "label": "Garrard County",
      "fips": "21079"
    },
    {
      "label": "Grant County",
      "fips": "21081"
    },
    {
      "label": "Graves County",
      "fips": "21083"
    },
    {
      "label": "Grayson County",
      "fips": "21085"
    },
    {
      "label": "Green County",
      "fips": "21087"
    },
    {
      "label": "Greenup County",
      "fips": "21089"
    },
    {
      "label": "Hancock County",
      "fips": "21091"
    },
    {
      "label": "Hardin County",
      "fips": "21093"
    },
    {
      "label": "Harlan County",
      "fips": "21095"
    },
    {
      "label": "Harrison County",
      "fips": "21097"
    },
    {
      "label": "Hart County",
      "fips": "21099"
    },
    {
      "label": "Henderson County",
      "fips": "21101"
    },
    {
      "label": "Henry County",
      "fips": "21103"
    },
    {
      "label": "Hickman County",
      "fips": "21105"
    },
    {
      "label": "Hopkins County",
      "fips": "21107"
    },
    {
      "label": "Jackson County",
      "fips": "21109"
    },
    {
      "label": "Jefferson County",
      "fips": "21111"
    },
    {
      "label": "Jessamine County",
      "fips": "21113"
    },
    {
      "label": "Johnson County",
      "fips": "21115"
    },
    {
      "label": "Kenton County",
      "fips": "21117"
    },
    {
      "label": "Knott County",
      "fips": "21119"
    },
    {
      "label": "Knox County",
      "fips": "21121"
    },
    {
      "label": "Larue County",
      "fips": "21123"
    },
    {
      "label": "Laurel County",
      "fips": "21125"
    },
    {
      "label": "Lawrence County",
      "fips": "21127"
    },
    {
      "label": "Lee County",
      "fips": "21129"
    },
    {
      "label": "Leslie County",
      "fips": "21131"
    },
    {
      "label": "Letcher County",
      "fips": "21133"
    },
    {
      "label": "Lewis County",
      "fips": "21135"
    },
    {
      "label": "Lincoln County",
      "fips": "21137"
    },
    {
      "label": "Livingston County",
      "fips": "21139"
    },
    {
      "label": "Logan County",
      "fips": "21141"
    },
    {
      "label": "Lyon County",
      "fips": "21143"
    },
    {
      "label": "McCracken County",
      "fips": "21145"
    },
    {
      "label": "McCreary County",
      "fips": "21147"
    },
    {
      "label": "McLean County",
      "fips": "21149"
    },
    {
      "label": "Madison County",
      "fips": "21151"
    },
    {
      "label": "Magoffin County",
      "fips": "21153"
    },
    {
      "label": "Marion County",
      "fips": "21155"
    },
    {
      "label": "Marshall County",
      "fips": "21157"
    },
    {
      "label": "Martin County",
      "fips": "21159"
    },
    {
      "label": "Mason County",
      "fips": "21161"
    },
    {
      "label": "Meade County",
      "fips": "21163"
    },
    {
      "label": "Menifee County",
      "fips": "21165"
    },
    {
      "label": "Mercer County",
      "fips": "21167"
    },
    {
      "label": "Metcalfe County",
      "fips": "21169"
    },
    {
      "label": "Monroe County",
      "fips": "21171"
    },
    {
      "label": "Montgomery County",
      "fips": "21173"
    },
    {
      "label": "Morgan County",
      "fips": "21175"
    },
    {
      "label": "Muhlenberg County",
      "fips": "21177"
    },
    {
      "label": "Nelson County",
      "fips": "21179"
    },
    {
      "label": "Nicholas County",
      "fips": "21181"
    },
    {
      "label": "Ohio County",
      "fips": "21183"
    },
    {
      "label": "Oldham County",
      "fips": "21185"
    },
    {
      "label": "Owen County",
      "fips": "21187"
    },
    {
      "label": "Owsley County",
      "fips": "21189"
    },
    {
      "label": "Pendleton County",
      "fips": "21191"
    },
    {
      "label": "Perry County",
      "fips": "21193"
    },
    {
      "label": "Pike County",
      "fips": "21195"
    },
    {
      "label": "Powell County",
      "fips": "21197"
    },
    {
      "label": "Pulaski County",
      "fips": "21199"
    },
    {
      "label": "Robertson County",
      "fips": "21201"
    },
    {
      "label": "Rockcastle County",
      "fips": "21203"
    },
    {
      "label": "Rowan County",
      "fips": "21205"
    },
    {
      "label": "Russell County",
      "fips": "21207"
    },
    {
      "label": "Scott County",
      "fips": "21209"
    },
    {
      "label": "Shelby County",
      "fips": "21211"
    },
    {
      "label": "Simpson County",
      "fips": "21213"
    },
    {
      "label": "Spencer County",
      "fips": "21215"
    },
    {
      "label": "Taylor County",
      "fips": "21217"
    },
    {
      "label": "Todd County",
      "fips": "21219"
    },
    {
      "label": "Trigg County",
      "fips": "21221"
    },
    {
      "label": "Trimble County",
      "fips": "21223"
    },
    {
      "label": "Union County",
      "fips": "21225"
    },
    {
      "label": "Warren County",
      "fips": "21227"
    },
    {
      "label": "Washington County",
      "fips": "21229"
    },
    {
      "label": "Wayne County",
      "fips": "21231"
    },
    {
      "label": "Webster County",
      "fips": "21233"
    },
    {
      "label": "Whitley County",
      "fips": "21235"
    },
    {
      "label": "Wolfe County",
      "fips": "21237"
    },
    {
      "label": "Woodford County",
      "fips": "21239"
    }
  ],
  "LA": [
    {
      "label": "Acadia Parish",
      "fips": "22001"
    },
    {
      "label": "Allen Parish",
      "fips": "22003"
    },
    {
      "label": "Ascension Parish",
      "fips": "22005"
    },
    {
      "label": "Assumption Parish",
      "fips": "22007"
    },
    {
      "label": "Avoyelles Parish",
      "fips": "22009"
    },
    {
      "label": "Beauregard Parish",
      "fips": "22011"
    },
    {
      "label": "Bienville Parish",
      "fips": "22013"
    },
    {
      "label": "Bossier Parish",
      "fips": "22015"
    },
    {
      "label": "Caddo Parish",
      "fips": "22017"
    },
    {
      "label": "Calcasieu Parish",
      "fips": "22019"
    },
    {
      "label": "Caldwell Parish",
      "fips": "22021"
    },
    {
      "label": "Cameron Parish",
      "fips": "22023"
    },
    {
      "label": "Catahoula Parish",
      "fips": "22025"
    },
    {
      "label": "Claiborne Parish",
      "fips": "22027"
    },
    {
      "label": "Concordia Parish",
      "fips": "22029"
    },
    {
      "label": "De Soto Parish",
      "fips": "22031"
    },
    {
      "label": "East Baton Rouge Parish",
      "fips": "22033"
    },
    {
      "label": "East Carroll Parish",
      "fips": "22035"
    },
    {
      "label": "East Feliciana Parish",
      "fips": "22037"
    },
    {
      "label": "Evangeline Parish",
      "fips": "22039"
    },
    {
      "label": "Franklin Parish",
      "fips": "22041"
    },
    {
      "label": "Grant Parish",
      "fips": "22043"
    },
    {
      "label": "Iberia Parish",
      "fips": "22045"
    },
    {
      "label": "Iberville Parish",
      "fips": "22047"
    },
    {
      "label": "Jackson Parish",
      "fips": "22049"
    },
    {
      "label": "Jefferson Parish",
      "fips": "22051"
    },
    {
      "label": "Jefferson Davis Parish",
      "fips": "22053"
    },
    {
      "label": "Lafayette Parish",
      "fips": "22055"
    },
    {
      "label": "Lafourche Parish",
      "fips": "22057"
    },
    {
      "label": "La Salle Parish",
      "fips": "22059"
    },
    {
      "label": "Lincoln Parish",
      "fips": "22061"
    },
    {
      "label": "Livingston Parish",
      "fips": "22063"
    },
    {
      "label": "Madison Parish",
      "fips": "22065"
    },
    {
      "label": "Morehouse Parish",
      "fips": "22067"
    },
    {
      "label": "Natchitoches Parish",
      "fips": "22069"
    },
    {
      "label": "Orleans Parish",
      "fips": "22071"
    },
    {
      "label": "Ouachita Parish",
      "fips": "22073"
    },
    {
      "label": "Plaquemines Parish",
      "fips": "22075"
    },
    {
      "label": "Pointe Coupee Parish",
      "fips": "22077"
    },
    {
      "label": "Rapides Parish",
      "fips": "22079"
    },
    {
      "label": "Red River Parish",
      "fips": "22081"
    },
    {
      "label": "Richland Parish",
      "fips": "22083"
    },
    {
      "label": "Sabine Parish",
      "fips": "22085"
    },
    {
      "label": "St. Bernard Parish",
      "fips": "22087"
    },
    {
      "label": "St. Charles Parish",
      "fips": "22089"
    },
    {
      "label": "St. Helena Parish",
      "fips": "22091"
    },
    {
      "label": "St. James Parish",
      "fips": "22093"
    },
    {
      "label": "St. John the Baptist Parish",
      "fips": "22095"
    },
    {
      "label": "St. Landry Parish",
      "fips": "22097"
    },
    {
      "label": "St. Martin Parish",
      "fips": "22099"
    },
    {
      "label": "St. Mary Parish",
      "fips": "22101"
    },
    {
      "label": "St. Tammany Parish",
      "fips": "22103"
    },
    {
      "label": "Tangipahoa Parish",
      "fips": "22105"
    },
    {
      "label": "Tensas Parish",
      "fips": "22107"
    },
    {
      "label": "Terrebonne Parish",
      "fips": "22109"
    },
    {
      "label": "Union Parish",
      "fips": "22111"
    },
    {
      "label": "Vermilion Parish",
      "fips": "22113"
    },
    {
      "label": "Vernon Parish",
      "fips": "22115"
    },
    {
      "label": "Washington Parish",
      "fips": "22117"
    },
    {
      "label": "Webster Parish",
      "fips": "22119"
    },
    {
      "label": "West Baton Rouge Parish",
      "fips": "22121"
    },
    {
      "label": "West Carroll Parish",
      "fips": "22123"
    },
    {
      "label": "West Feliciana Parish",
      "fips": "22125"
    },
    {
      "label": "Winn Parish",
      "fips": "22127"
    }
  ],
  "ME": [
    {
      "label": "Androscoggin County",
      "fips": "23001"
    },
    {
      "label": "Aroostook County",
      "fips": "23003"
    },
    {
      "label": "Cumberland County",
      "fips": "23005"
    },
    {
      "label": "Franklin County",
      "fips": "23007"
    },
    {
      "label": "Hancock County",
      "fips": "23009"
    },
    {
      "label": "Kennebec County",
      "fips": "23011"
    },
    {
      "label": "Knox County",
      "fips": "23013"
    },
    {
      "label": "Lincoln County",
      "fips": "23015"
    },
    {
      "label": "Oxford County",
      "fips": "23017"
    },
    {
      "label": "Penobscot County",
      "fips": "23019"
    },
    {
      "label": "Piscataquis County",
      "fips": "23021"
    },
    {
      "label": "Sagadahoc County",
      "fips": "23023"
    },
    {
      "label": "Somerset County",
      "fips": "23025"
    },
    {
      "label": "Waldo County",
      "fips": "23027"
    },
    {
      "label": "Washington County",
      "fips": "23029"
    },
    {
      "label": "York County",
      "fips": "23031"
    }
  ],
  "MD": [
    {
      "label": "Allegany County",
      "fips": "24001"
    },
    {
      "label": "Anne Arundel County",
      "fips": "24003"
    },
    {
      "label": "Baltimore County",
      "fips": "24005"
    },
    {
      "label": "Calvert County",
      "fips": "24009"
    },
    {
      "label": "Caroline County",
      "fips": "24011"
    },
    {
      "label": "Carroll County",
      "fips": "24013"
    },
    {
      "label": "Cecil County",
      "fips": "24015"
    },
    {
      "label": "Charles County",
      "fips": "24017"
    },
    {
      "label": "Dorchester County",
      "fips": "24019"
    },
    {
      "label": "Frederick County",
      "fips": "24021"
    },
    {
      "label": "Garrett County",
      "fips": "24023"
    },
    {
      "label": "Harford County",
      "fips": "24025"
    },
    {
      "label": "Howard County",
      "fips": "24027"
    },
    {
      "label": "Kent County",
      "fips": "24029"
    },
    {
      "label": "Montgomery County",
      "fips": "24031"
    },
    {
      "label": "Prince George's County",
      "fips": "24033"
    },
    {
      "label": "Queen Anne's County",
      "fips": "24035"
    },
    {
      "label": "St. Mary's County",
      "fips": "24037"
    },
    {
      "label": "Somerset County",
      "fips": "24039"
    },
    {
      "label": "Talbot County",
      "fips": "24041"
    },
    {
      "label": "Washington County",
      "fips": "24043"
    },
    {
      "label": "Wicomico County",
      "fips": "24045"
    },
    {
      "label": "Worcester County",
      "fips": "24047"
    },
    {
      "label": "Baltimore city",
      "fips": "24510"
    }
  ],
  "MA": [
    {
      "label": "Barnstable County",
      "fips": "25001"
    },
    {
      "label": "Berkshire County",
      "fips": "25003"
    },
    {
      "label": "Bristol County",
      "fips": "25005"
    },
    {
      "label": "Dukes County",
      "fips": "25007"
    },
    {
      "label": "Essex County",
      "fips": "25009"
    },
    {
      "label": "Franklin County",
      "fips": "25011"
    },
    {
      "label": "Hampden County",
      "fips": "25013"
    },
    {
      "label": "Hampshire County",
      "fips": "25015"
    },
    {
      "label": "Middlesex County",
      "fips": "25017"
    },
    {
      "label": "Nantucket County",
      "fips": "25019"
    },
    {
      "label": "Norfolk County",
      "fips": "25021"
    },
    {
      "label": "Plymouth County",
      "fips": "25023"
    },
    {
      "label": "Suffolk County",
      "fips": "25025"
    },
    {
      "label": "Worcester County",
      "fips": "25027"
    }
  ],
  "MI": [
    {
      "label": "Alcona County",
      "fips": "26001"
    },
    {
      "label": "Alger County",
      "fips": "26003"
    },
    {
      "label": "Allegan County",
      "fips": "26005"
    },
    {
      "label": "Alpena County",
      "fips": "26007"
    },
    {
      "label": "Antrim County",
      "fips": "26009"
    },
    {
      "label": "Arenac County",
      "fips": "26011"
    },
    {
      "label": "Baraga County",
      "fips": "26013"
    },
    {
      "label": "Barry County",
      "fips": "26015"
    },
    {
      "label": "Bay County",
      "fips": "26017"
    },
    {
      "label": "Benzie County",
      "fips": "26019"
    },
    {
      "label": "Berrien County",
      "fips": "26021"
    },
    {
      "label": "Branch County",
      "fips": "26023"
    },
    {
      "label": "Calhoun County",
      "fips": "26025"
    },
    {
      "label": "Cass County",
      "fips": "26027"
    },
    {
      "label": "Charlevoix County",
      "fips": "26029"
    },
    {
      "label": "Cheboygan County",
      "fips": "26031"
    },
    {
      "label": "Chippewa County",
      "fips": "26033"
    },
    {
      "label": "Clare County",
      "fips": "26035"
    },
    {
      "label": "Clinton County",
      "fips": "26037"
    },
    {
      "label": "Crawford County",
      "fips": "26039"
    },
    {
      "label": "Delta County",
      "fips": "26041"
    },
    {
      "label": "Dickinson County",
      "fips": "26043"
    },
    {
      "label": "Eaton County",
      "fips": "26045"
    },
    {
      "label": "Emmet County",
      "fips": "26047"
    },
    {
      "label": "Genesee County",
      "fips": "26049"
    },
    {
      "label": "Gladwin County",
      "fips": "26051"
    },
    {
      "label": "Gogebic County",
      "fips": "26053"
    },
    {
      "label": "Grand Traverse County",
      "fips": "26055"
    },
    {
      "label": "Gratiot County",
      "fips": "26057"
    },
    {
      "label": "Hillsdale County",
      "fips": "26059"
    },
    {
      "label": "Houghton County",
      "fips": "26061"
    },
    {
      "label": "Huron County",
      "fips": "26063"
    },
    {
      "label": "Ingham County",
      "fips": "26065"
    },
    {
      "label": "Ionia County",
      "fips": "26067"
    },
    {
      "label": "Iosco County",
      "fips": "26069"
    },
    {
      "label": "Iron County",
      "fips": "26071"
    },
    {
      "label": "Isabella County",
      "fips": "26073"
    },
    {
      "label": "Jackson County",
      "fips": "26075"
    },
    {
      "label": "Kalamazoo County",
      "fips": "26077"
    },
    {
      "label": "Kalkaska County",
      "fips": "26079"
    },
    {
      "label": "Kent County",
      "fips": "26081"
    },
    {
      "label": "Keweenaw County",
      "fips": "26083"
    },
    {
      "label": "Lake County",
      "fips": "26085"
    },
    {
      "label": "Lapeer County",
      "fips": "26087"
    },
    {
      "label": "Leelanau County",
      "fips": "26089"
    },
    {
      "label": "Lenawee County",
      "fips": "26091"
    },
    {
      "label": "Livingston County",
      "fips": "26093"
    },
    {
      "label": "Luce County",
      "fips": "26095"
    },
    {
      "label": "Mackinac County",
      "fips": "26097"
    },
    {
      "label": "Macomb County",
      "fips": "26099"
    },
    {
      "label": "Manistee County",
      "fips": "26101"
    },
    {
      "label": "Marquette County",
      "fips": "26103"
    },
    {
      "label": "Mason County",
      "fips": "26105"
    },
    {
      "label": "Mecosta County",
      "fips": "26107"
    },
    {
      "label": "Menominee County",
      "fips": "26109"
    },
    {
      "label": "Midland County",
      "fips": "26111"
    },
    {
      "label": "Missaukee County",
      "fips": "26113"
    },
    {
      "label": "Monroe County",
      "fips": "26115"
    },
    {
      "label": "Montcalm County",
      "fips": "26117"
    },
    {
      "label": "Montmorency County",
      "fips": "26119"
    },
    {
      "label": "Muskegon County",
      "fips": "26121"
    },
    {
      "label": "Newaygo County",
      "fips": "26123"
    },
    {
      "label": "Oakland County",
      "fips": "26125"
    },
    {
      "label": "Oceana County",
      "fips": "26127"
    },
    {
      "label": "Ogemaw County",
      "fips": "26129"
    },
    {
      "label": "Ontonagon County",
      "fips": "26131"
    },
    {
      "label": "Osceola County",
      "fips": "26133"
    },
    {
      "label": "Oscoda County",
      "fips": "26135"
    },
    {
      "label": "Otsego County",
      "fips": "26137"
    },
    {
      "label": "Ottawa County",
      "fips": "26139"
    },
    {
      "label": "Presque Isle County",
      "fips": "26141"
    },
    {
      "label": "Roscommon County",
      "fips": "26143"
    },
    {
      "label": "Saginaw County",
      "fips": "26145"
    },
    {
      "label": "St. Clair County",
      "fips": "26147"
    },
    {
      "label": "St. Joseph County",
      "fips": "26149"
    },
    {
      "label": "Sanilac County",
      "fips": "26151"
    },
    {
      "label": "Schoolcraft County",
      "fips": "26153"
    },
    {
      "label": "Shiawassee County",
      "fips": "26155"
    },
    {
      "label": "Tuscola County",
      "fips": "26157"
    },
    {
      "label": "Van Buren County",
      "fips": "26159"
    },
    {
      "label": "Washtenaw County",
      "fips": "26161"
    },
    {
      "label": "Wayne County",
      "fips": "26163"
    },
    {
      "label": "Wexford County",
      "fips": "26165"
    }
  ],
  "MN": [
    {
      "label": "Aitkin County",
      "fips": "27001"
    },
    {
      "label": "Anoka County",
      "fips": "27003"
    },
    {
      "label": "Becker County",
      "fips": "27005"
    },
    {
      "label": "Beltrami County",
      "fips": "27007"
    },
    {
      "label": "Benton County",
      "fips": "27009"
    },
    {
      "label": "Big Stone County",
      "fips": "27011"
    },
    {
      "label": "Blue Earth County",
      "fips": "27013"
    },
    {
      "label": "Brown County",
      "fips": "27015"
    },
    {
      "label": "Carlton County",
      "fips": "27017"
    },
    {
      "label": "Carver County",
      "fips": "27019"
    },
    {
      "label": "Cass County",
      "fips": "27021"
    },
    {
      "label": "Chippewa County",
      "fips": "27023"
    },
    {
      "label": "Chisago County",
      "fips": "27025"
    },
    {
      "label": "Clay County",
      "fips": "27027"
    },
    {
      "label": "Clearwater County",
      "fips": "27029"
    },
    {
      "label": "Cook County",
      "fips": "27031"
    },
    {
      "label": "Cottonwood County",
      "fips": "27033"
    },
    {
      "label": "Crow Wing County",
      "fips": "27035"
    },
    {
      "label": "Dakota County",
      "fips": "27037"
    },
    {
      "label": "Dodge County",
      "fips": "27039"
    },
    {
      "label": "Douglas County",
      "fips": "27041"
    },
    {
      "label": "Faribault County",
      "fips": "27043"
    },
    {
      "label": "Fillmore County",
      "fips": "27045"
    },
    {
      "label": "Freeborn County",
      "fips": "27047"
    },
    {
      "label": "Goodhue County",
      "fips": "27049"
    },
    {
      "label": "Grant County",
      "fips": "27051"
    },
    {
      "label": "Hennepin County",
      "fips": "27053"
    },
    {
      "label": "Houston County",
      "fips": "27055"
    },
    {
      "label": "Hubbard County",
      "fips": "27057"
    },
    {
      "label": "Isanti County",
      "fips": "27059"
    },
    {
      "label": "Itasca County",
      "fips": "27061"
    },
    {
      "label": "Jackson County",
      "fips": "27063"
    },
    {
      "label": "Kanabec County",
      "fips": "27065"
    },
    {
      "label": "Kandiyohi County",
      "fips": "27067"
    },
    {
      "label": "Kittson County",
      "fips": "27069"
    },
    {
      "label": "Koochiching County",
      "fips": "27071"
    },
    {
      "label": "Lac qui Parle County",
      "fips": "27073"
    },
    {
      "label": "Lake County",
      "fips": "27075"
    },
    {
      "label": "Lake of the Woods County",
      "fips": "27077"
    },
    {
      "label": "Le Sueur County",
      "fips": "27079"
    },
    {
      "label": "Lincoln County",
      "fips": "27081"
    },
    {
      "label": "Lyon County",
      "fips": "27083"
    },
    {
      "label": "McLeod County",
      "fips": "27085"
    },
    {
      "label": "Mahnomen County",
      "fips": "27087"
    },
    {
      "label": "Marshall County",
      "fips": "27089"
    },
    {
      "label": "Martin County",
      "fips": "27091"
    },
    {
      "label": "Meeker County",
      "fips": "27093"
    },
    {
      "label": "Mille Lacs County",
      "fips": "27095"
    },
    {
      "label": "Morrison County",
      "fips": "27097"
    },
    {
      "label": "Mower County",
      "fips": "27099"
    },
    {
      "label": "Murray County",
      "fips": "27101"
    },
    {
      "label": "Nicollet County",
      "fips": "27103"
    },
    {
      "label": "Nobles County",
      "fips": "27105"
    },
    {
      "label": "Norman County",
      "fips": "27107"
    },
    {
      "label": "Olmsted County",
      "fips": "27109"
    },
    {
      "label": "Otter Tail County",
      "fips": "27111"
    },
    {
      "label": "Pennington County",
      "fips": "27113"
    },
    {
      "label": "Pine County",
      "fips": "27115"
    },
    {
      "label": "Pipestone County",
      "fips": "27117"
    },
    {
      "label": "Polk County",
      "fips": "27119"
    },
    {
      "label": "Pope County",
      "fips": "27121"
    },
    {
      "label": "Ramsey County",
      "fips": "27123"
    },
    {
      "label": "Red Lake County",
      "fips": "27125"
    },
    {
      "label": "Redwood County",
      "fips": "27127"
    },
    {
      "label": "Renville County",
      "fips": "27129"
    },
    {
      "label": "Rice County",
      "fips": "27131"
    },
    {
      "label": "Rock County",
      "fips": "27133"
    },
    {
      "label": "Roseau County",
      "fips": "27135"
    },
    {
      "label": "St. Louis County",
      "fips": "27137"
    },
    {
      "label": "Scott County",
      "fips": "27139"
    },
    {
      "label": "Sherburne County",
      "fips": "27141"
    },
    {
      "label": "Sibley County",
      "fips": "27143"
    },
    {
      "label": "Stearns County",
      "fips": "27145"
    },
    {
      "label": "Steele County",
      "fips": "27147"
    },
    {
      "label": "Stevens County",
      "fips": "27149"
    },
    {
      "label": "Swift County",
      "fips": "27151"
    },
    {
      "label": "Todd County",
      "fips": "27153"
    },
    {
      "label": "Traverse County",
      "fips": "27155"
    },
    {
      "label": "Wabasha County",
      "fips": "27157"
    },
    {
      "label": "Wadena County",
      "fips": "27159"
    },
    {
      "label": "Waseca County",
      "fips": "27161"
    },
    {
      "label": "Washington County",
      "fips": "27163"
    },
    {
      "label": "Watonwan County",
      "fips": "27165"
    },
    {
      "label": "Wilkin County",
      "fips": "27167"
    },
    {
      "label": "Winona County",
      "fips": "27169"
    },
    {
      "label": "Wright County",
      "fips": "27171"
    },
    {
      "label": "Yellow Medicine County",
      "fips": "27173"
    }
  ],
  "MS": [
    {
      "label": "Adams County",
      "fips": "28001"
    },
    {
      "label": "Alcorn County",
      "fips": "28003"
    },
    {
      "label": "Amite County",
      "fips": "28005"
    },
    {
      "label": "Attala County",
      "fips": "28007"
    },
    {
      "label": "Benton County",
      "fips": "28009"
    },
    {
      "label": "Bolivar County",
      "fips": "28011"
    },
    {
      "label": "Calhoun County",
      "fips": "28013"
    },
    {
      "label": "Carroll County",
      "fips": "28015"
    },
    {
      "label": "Chickasaw County",
      "fips": "28017"
    },
    {
      "label": "Choctaw County",
      "fips": "28019"
    },
    {
      "label": "Claiborne County",
      "fips": "28021"
    },
    {
      "label": "Clarke County",
      "fips": "28023"
    },
    {
      "label": "Clay County",
      "fips": "28025"
    },
    {
      "label": "Coahoma County",
      "fips": "28027"
    },
    {
      "label": "Copiah County",
      "fips": "28029"
    },
    {
      "label": "Covington County",
      "fips": "28031"
    },
    {
      "label": "DeSoto County",
      "fips": "28033"
    },
    {
      "label": "Forrest County",
      "fips": "28035"
    },
    {
      "label": "Franklin County",
      "fips": "28037"
    },
    {
      "label": "George County",
      "fips": "28039"
    },
    {
      "label": "Greene County",
      "fips": "28041"
    },
    {
      "label": "Grenada County",
      "fips": "28043"
    },
    {
      "label": "Hancock County",
      "fips": "28045"
    },
    {
      "label": "Harrison County",
      "fips": "28047"
    },
    {
      "label": "Hinds County",
      "fips": "28049"
    },
    {
      "label": "Holmes County",
      "fips": "28051"
    },
    {
      "label": "Humphreys County",
      "fips": "28053"
    },
    {
      "label": "Issaquena County",
      "fips": "28055"
    },
    {
      "label": "Itawamba County",
      "fips": "28057"
    },
    {
      "label": "Jackson County",
      "fips": "28059"
    },
    {
      "label": "Jasper County",
      "fips": "28061"
    },
    {
      "label": "Jefferson County",
      "fips": "28063"
    },
    {
      "label": "Jefferson Davis County",
      "fips": "28065"
    },
    {
      "label": "Jones County",
      "fips": "28067"
    },
    {
      "label": "Kemper County",
      "fips": "28069"
    },
    {
      "label": "Lafayette County",
      "fips": "28071"
    },
    {
      "label": "Lamar County",
      "fips": "28073"
    },
    {
      "label": "Lauderdale County",
      "fips": "28075"
    },
    {
      "label": "Lawrence County",
      "fips": "28077"
    },
    {
      "label": "Leake County",
      "fips": "28079"
    },
    {
      "label": "Lee County",
      "fips": "28081"
    },
    {
      "label": "Leflore County",
      "fips": "28083"
    },
    {
      "label": "Lincoln County",
      "fips": "28085"
    },
    {
      "label": "Lowndes County",
      "fips": "28087"
    },
    {
      "label": "Madison County",
      "fips": "28089"
    },
    {
      "label": "Marion County",
      "fips": "28091"
    },
    {
      "label": "Marshall County",
      "fips": "28093"
    },
    {
      "label": "Monroe County",
      "fips": "28095"
    },
    {
      "label": "Montgomery County",
      "fips": "28097"
    },
    {
      "label": "Neshoba County",
      "fips": "28099"
    },
    {
      "label": "Newton County",
      "fips": "28101"
    },
    {
      "label": "Noxubee County",
      "fips": "28103"
    },
    {
      "label": "Oktibbeha County",
      "fips": "28105"
    },
    {
      "label": "Panola County",
      "fips": "28107"
    },
    {
      "label": "Pearl River County",
      "fips": "28109"
    },
    {
      "label": "Perry County",
      "fips": "28111"
    },
    {
      "label": "Pike County",
      "fips": "28113"
    },
    {
      "label": "Pontotoc County",
      "fips": "28115"
    },
    {
      "label": "Prentiss County",
      "fips": "28117"
    },
    {
      "label": "Quitman County",
      "fips": "28119"
    },
    {
      "label": "Rankin County",
      "fips": "28121"
    },
    {
      "label": "Scott County",
      "fips": "28123"
    },
    {
      "label": "Sharkey County",
      "fips": "28125"
    },
    {
      "label": "Simpson County",
      "fips": "28127"
    },
    {
      "label": "Smith County",
      "fips": "28129"
    },
    {
      "label": "Stone County",
      "fips": "28131"
    },
    {
      "label": "Sunflower County",
      "fips": "28133"
    },
    {
      "label": "Tallahatchie County",
      "fips": "28135"
    },
    {
      "label": "Tate County",
      "fips": "28137"
    },
    {
      "label": "Tippah County",
      "fips": "28139"
    },
    {
      "label": "Tishomingo County",
      "fips": "28141"
    },
    {
      "label": "Tunica County",
      "fips": "28143"
    },
    {
      "label": "Union County",
      "fips": "28145"
    },
    {
      "label": "Walthall County",
      "fips": "28147"
    },
    {
      "label": "Warren County",
      "fips": "28149"
    },
    {
      "label": "Washington County",
      "fips": "28151"
    },
    {
      "label": "Wayne County",
      "fips": "28153"
    },
    {
      "label": "Webster County",
      "fips": "28155"
    },
    {
      "label": "Wilkinson County",
      "fips": "28157"
    },
    {
      "label": "Winston County",
      "fips": "28159"
    },
    {
      "label": "Yalobusha County",
      "fips": "28161"
    },
    {
      "label": "Yazoo County",
      "fips": "28163"
    }
  ],
  "MO": [
    {
      "label": "Adair County",
      "fips": "29001"
    },
    {
      "label": "Andrew County",
      "fips": "29003"
    },
    {
      "label": "Atchison County",
      "fips": "29005"
    },
    {
      "label": "Audrain County",
      "fips": "29007"
    },
    {
      "label": "Barry County",
      "fips": "29009"
    },
    {
      "label": "Barton County",
      "fips": "29011"
    },
    {
      "label": "Bates County",
      "fips": "29013"
    },
    {
      "label": "Benton County",
      "fips": "29015"
    },
    {
      "label": "Bollinger County",
      "fips": "29017"
    },
    {
      "label": "Boone County",
      "fips": "29019"
    },
    {
      "label": "Buchanan County",
      "fips": "29021"
    },
    {
      "label": "Butler County",
      "fips": "29023"
    },
    {
      "label": "Caldwell County",
      "fips": "29025"
    },
    {
      "label": "Callaway County",
      "fips": "29027"
    },
    {
      "label": "Camden County",
      "fips": "29029"
    },
    {
      "label": "Cape Girardeau County",
      "fips": "29031"
    },
    {
      "label": "Carroll County",
      "fips": "29033"
    },
    {
      "label": "Carter County",
      "fips": "29035"
    },
    {
      "label": "Cass County",
      "fips": "29037"
    },
    {
      "label": "Cedar County",
      "fips": "29039"
    },
    {
      "label": "Chariton County",
      "fips": "29041"
    },
    {
      "label": "Christian County",
      "fips": "29043"
    },
    {
      "label": "Clark County",
      "fips": "29045"
    },
    {
      "label": "Clay County",
      "fips": "29047"
    },
    {
      "label": "Clinton County",
      "fips": "29049"
    },
    {
      "label": "Cole County",
      "fips": "29051"
    },
    {
      "label": "Cooper County",
      "fips": "29053"
    },
    {
      "label": "Crawford County",
      "fips": "29055"
    },
    {
      "label": "Dade County",
      "fips": "29057"
    },
    {
      "label": "Dallas County",
      "fips": "29059"
    },
    {
      "label": "Daviess County",
      "fips": "29061"
    },
    {
      "label": "DeKalb County",
      "fips": "29063"
    },
    {
      "label": "Dent County",
      "fips": "29065"
    },
    {
      "label": "Douglas County",
      "fips": "29067"
    },
    {
      "label": "Dunklin County",
      "fips": "29069"
    },
    {
      "label": "Franklin County",
      "fips": "29071"
    },
    {
      "label": "Gasconade County",
      "fips": "29073"
    },
    {
      "label": "Gentry County",
      "fips": "29075"
    },
    {
      "label": "Greene County",
      "fips": "29077"
    },
    {
      "label": "Grundy County",
      "fips": "29079"
    },
    {
      "label": "Harrison County",
      "fips": "29081"
    },
    {
      "label": "Henry County",
      "fips": "29083"
    },
    {
      "label": "Hickory County",
      "fips": "29085"
    },
    {
      "label": "Holt County",
      "fips": "29087"
    },
    {
      "label": "Howard County",
      "fips": "29089"
    },
    {
      "label": "Howell County",
      "fips": "29091"
    },
    {
      "label": "Iron County",
      "fips": "29093"
    },
    {
      "label": "Jackson County",
      "fips": "29095"
    },
    {
      "label": "Jasper County",
      "fips": "29097"
    },
    {
      "label": "Jefferson County",
      "fips": "29099"
    },
    {
      "label": "Johnson County",
      "fips": "29101"
    },
    {
      "label": "Knox County",
      "fips": "29103"
    },
    {
      "label": "Laclede County",
      "fips": "29105"
    },
    {
      "label": "Lafayette County",
      "fips": "29107"
    },
    {
      "label": "Lawrence County",
      "fips": "29109"
    },
    {
      "label": "Lewis County",
      "fips": "29111"
    },
    {
      "label": "Lincoln County",
      "fips": "29113"
    },
    {
      "label": "Linn County",
      "fips": "29115"
    },
    {
      "label": "Livingston County",
      "fips": "29117"
    },
    {
      "label": "McDonald County",
      "fips": "29119"
    },
    {
      "label": "Macon County",
      "fips": "29121"
    },
    {
      "label": "Madison County",
      "fips": "29123"
    },
    {
      "label": "Maries County",
      "fips": "29125"
    },
    {
      "label": "Marion County",
      "fips": "29127"
    },
    {
      "label": "Mercer County",
      "fips": "29129"
    },
    {
      "label": "Miller County",
      "fips": "29131"
    },
    {
      "label": "Mississippi County",
      "fips": "29133"
    },
    {
      "label": "Moniteau County",
      "fips": "29135"
    },
    {
      "label": "Monroe County",
      "fips": "29137"
    },
    {
      "label": "Montgomery County",
      "fips": "29139"
    },
    {
      "label": "Morgan County",
      "fips": "29141"
    },
    {
      "label": "New Madrid County",
      "fips": "29143"
    },
    {
      "label": "Newton County",
      "fips": "29145"
    },
    {
      "label": "Nodaway County",
      "fips": "29147"
    },
    {
      "label": "Oregon County",
      "fips": "29149"
    },
    {
      "label": "Osage County",
      "fips": "29151"
    },
    {
      "label": "Ozark County",
      "fips": "29153"
    },
    {
      "label": "Pemiscot County",
      "fips": "29155"
    },
    {
      "label": "Perry County",
      "fips": "29157"
    },
    {
      "label": "Pettis County",
      "fips": "29159"
    },
    {
      "label": "Phelps County",
      "fips": "29161"
    },
    {
      "label": "Pike County",
      "fips": "29163"
    },
    {
      "label": "Platte County",
      "fips": "29165"
    },
    {
      "label": "Polk County",
      "fips": "29167"
    },
    {
      "label": "Pulaski County",
      "fips": "29169"
    },
    {
      "label": "Putnam County",
      "fips": "29171"
    },
    {
      "label": "Ralls County",
      "fips": "29173"
    },
    {
      "label": "Randolph County",
      "fips": "29175"
    },
    {
      "label": "Ray County",
      "fips": "29177"
    },
    {
      "label": "Reynolds County",
      "fips": "29179"
    },
    {
      "label": "Ripley County",
      "fips": "29181"
    },
    {
      "label": "St. Charles County",
      "fips": "29183"
    },
    {
      "label": "St. Clair County",
      "fips": "29185"
    },
    {
      "label": "Ste. Genevieve County",
      "fips": "29186"
    },
    {
      "label": "St. Francois County",
      "fips": "29187"
    },
    {
      "label": "St. Louis County",
      "fips": "29189"
    },
    {
      "label": "Saline County",
      "fips": "29195"
    },
    {
      "label": "Schuyler County",
      "fips": "29197"
    },
    {
      "label": "Scotland County",
      "fips": "29199"
    },
    {
      "label": "Scott County",
      "fips": "29201"
    },
    {
      "label": "Shannon County",
      "fips": "29203"
    },
    {
      "label": "Shelby County",
      "fips": "29205"
    },
    {
      "label": "Stoddard County",
      "fips": "29207"
    },
    {
      "label": "Stone County",
      "fips": "29209"
    },
    {
      "label": "Sullivan County",
      "fips": "29211"
    },
    {
      "label": "Taney County",
      "fips": "29213"
    },
    {
      "label": "Texas County",
      "fips": "29215"
    },
    {
      "label": "Vernon County",
      "fips": "29217"
    },
    {
      "label": "Warren County",
      "fips": "29219"
    },
    {
      "label": "Washington County",
      "fips": "29221"
    },
    {
      "label": "Wayne County",
      "fips": "29223"
    },
    {
      "label": "Webster County",
      "fips": "29225"
    },
    {
      "label": "Worth County",
      "fips": "29227"
    },
    {
      "label": "Wright County",
      "fips": "29229"
    },
    {
      "label": "St. Louis city",
      "fips": "29510"
    }
  ],
  "MT": [
    {
      "label": "Beaverhead County",
      "fips": "30001"
    },
    {
      "label": "Big Horn County",
      "fips": "30003"
    },
    {
      "label": "Blaine County",
      "fips": "30005"
    },
    {
      "label": "Broadwater County",
      "fips": "30007"
    },
    {
      "label": "Carbon County",
      "fips": "30009"
    },
    {
      "label": "Carter County",
      "fips": "30011"
    },
    {
      "label": "Cascade County",
      "fips": "30013"
    },
    {
      "label": "Chouteau County",
      "fips": "30015"
    },
    {
      "label": "Custer County",
      "fips": "30017"
    },
    {
      "label": "Daniels County",
      "fips": "30019"
    },
    {
      "label": "Dawson County",
      "fips": "30021"
    },
    {
      "label": "Deer Lodge County",
      "fips": "30023"
    },
    {
      "label": "Fallon County",
      "fips": "30025"
    },
    {
      "label": "Fergus County",
      "fips": "30027"
    },
    {
      "label": "Flathead County",
      "fips": "30029"
    },
    {
      "label": "Gallatin County",
      "fips": "30031"
    },
    {
      "label": "Garfield County",
      "fips": "30033"
    },
    {
      "label": "Glacier County",
      "fips": "30035"
    },
    {
      "label": "Golden Valley County",
      "fips": "30037"
    },
    {
      "label": "Granite County",
      "fips": "30039"
    },
    {
      "label": "Hill County",
      "fips": "30041"
    },
    {
      "label": "Jefferson County",
      "fips": "30043"
    },
    {
      "label": "Judith Basin County",
      "fips": "30045"
    },
    {
      "label": "Lake County",
      "fips": "30047"
    },
    {
      "label": "Lewis and Clark County",
      "fips": "30049"
    },
    {
      "label": "Liberty County",
      "fips": "30051"
    },
    {
      "label": "Lincoln County",
      "fips": "30053"
    },
    {
      "label": "McCone County",
      "fips": "30055"
    },
    {
      "label": "Madison County",
      "fips": "30057"
    },
    {
      "label": "Meagher County",
      "fips": "30059"
    },
    {
      "label": "Mineral County",
      "fips": "30061"
    },
    {
      "label": "Missoula County",
      "fips": "30063"
    },
    {
      "label": "Musselshell County",
      "fips": "30065"
    },
    {
      "label": "Park County",
      "fips": "30067"
    },
    {
      "label": "Petroleum County",
      "fips": "30069"
    },
    {
      "label": "Phillips County",
      "fips": "30071"
    },
    {
      "label": "Pondera County",
      "fips": "30073"
    },
    {
      "label": "Powder River County",
      "fips": "30075"
    },
    {
      "label": "Powell County",
      "fips": "30077"
    },
    {
      "label": "Prairie County",
      "fips": "30079"
    },
    {
      "label": "Ravalli County",
      "fips": "30081"
    },
    {
      "label": "Richland County",
      "fips": "30083"
    },
    {
      "label": "Roosevelt County",
      "fips": "30085"
    },
    {
      "label": "Rosebud County",
      "fips": "30087"
    },
    {
      "label": "Sanders County",
      "fips": "30089"
    },
    {
      "label": "Sheridan County",
      "fips": "30091"
    },
    {
      "label": "Silver Bow County",
      "fips": "30093"
    },
    {
      "label": "Stillwater County",
      "fips": "30095"
    },
    {
      "label": "Sweet Grass County",
      "fips": "30097"
    },
    {
      "label": "Teton County",
      "fips": "30099"
    },
    {
      "label": "Toole County",
      "fips": "30101"
    },
    {
      "label": "Treasure County",
      "fips": "30103"
    },
    {
      "label": "Valley County",
      "fips": "30105"
    },
    {
      "label": "Wheatland County",
      "fips": "30107"
    },
    {
      "label": "Wibaux County",
      "fips": "30109"
    },
    {
      "label": "Yellowstone County",
      "fips": "30111"
    }
  ],
  "NE": [
    {
      "label": "Adams County",
      "fips": "31001"
    },
    {
      "label": "Antelope County",
      "fips": "31003"
    },
    {
      "label": "Arthur County",
      "fips": "31005"
    },
    {
      "label": "Banner County",
      "fips": "31007"
    },
    {
      "label": "Blaine County",
      "fips": "31009"
    },
    {
      "label": "Boone County",
      "fips": "31011"
    },
    {
      "label": "Box Butte County",
      "fips": "31013"
    },
    {
      "label": "Boyd County",
      "fips": "31015"
    },
    {
      "label": "Brown County",
      "fips": "31017"
    },
    {
      "label": "Buffalo County",
      "fips": "31019"
    },
    {
      "label": "Burt County",
      "fips": "31021"
    },
    {
      "label": "Butler County",
      "fips": "31023"
    },
    {
      "label": "Cass County",
      "fips": "31025"
    },
    {
      "label": "Cedar County",
      "fips": "31027"
    },
    {
      "label": "Chase County",
      "fips": "31029"
    },
    {
      "label": "Cherry County",
      "fips": "31031"
    },
    {
      "label": "Cheyenne County",
      "fips": "31033"
    },
    {
      "label": "Clay County",
      "fips": "31035"
    },
    {
      "label": "Colfax County",
      "fips": "31037"
    },
    {
      "label": "Cuming County",
      "fips": "31039"
    },
    {
      "label": "Custer County",
      "fips": "31041"
    },
    {
      "label": "Dakota County",
      "fips": "31043"
    },
    {
      "label": "Dawes County",
      "fips": "31045"
    },
    {
      "label": "Dawson County",
      "fips": "31047"
    },
    {
      "label": "Deuel County",
      "fips": "31049"
    },
    {
      "label": "Dixon County",
      "fips": "31051"
    },
    {
      "label": "Dodge County",
      "fips": "31053"
    },
    {
      "label": "Douglas County",
      "fips": "31055"
    },
    {
      "label": "Dundy County",
      "fips": "31057"
    },
    {
      "label": "Fillmore County",
      "fips": "31059"
    },
    {
      "label": "Franklin County",
      "fips": "31061"
    },
    {
      "label": "Frontier County",
      "fips": "31063"
    },
    {
      "label": "Furnas County",
      "fips": "31065"
    },
    {
      "label": "Gage County",
      "fips": "31067"
    },
    {
      "label": "Garden County",
      "fips": "31069"
    },
    {
      "label": "Garfield County",
      "fips": "31071"
    },
    {
      "label": "Gosper County",
      "fips": "31073"
    },
    {
      "label": "Grant County",
      "fips": "31075"
    },
    {
      "label": "Greeley County",
      "fips": "31077"
    },
    {
      "label": "Hall County",
      "fips": "31079"
    },
    {
      "label": "Hamilton County",
      "fips": "31081"
    },
    {
      "label": "Harlan County",
      "fips": "31083"
    },
    {
      "label": "Hayes County",
      "fips": "31085"
    },
    {
      "label": "Hitchcock County",
      "fips": "31087"
    },
    {
      "label": "Holt County",
      "fips": "31089"
    },
    {
      "label": "Hooker County",
      "fips": "31091"
    },
    {
      "label": "Howard County",
      "fips": "31093"
    },
    {
      "label": "Jefferson County",
      "fips": "31095"
    },
    {
      "label": "Johnson County",
      "fips": "31097"
    },
    {
      "label": "Kearney County",
      "fips": "31099"
    },
    {
      "label": "Keith County",
      "fips": "31101"
    },
    {
      "label": "Keya Paha County",
      "fips": "31103"
    },
    {
      "label": "Kimball County",
      "fips": "31105"
    },
    {
      "label": "Knox County",
      "fips": "31107"
    },
    {
      "label": "Lancaster County",
      "fips": "31109"
    },
    {
      "label": "Lincoln County",
      "fips": "31111"
    },
    {
      "label": "Logan County",
      "fips": "31113"
    },
    {
      "label": "Loup County",
      "fips": "31115"
    },
    {
      "label": "McPherson County",
      "fips": "31117"
    },
    {
      "label": "Madison County",
      "fips": "31119"
    },
    {
      "label": "Merrick County",
      "fips": "31121"
    },
    {
      "label": "Morrill County",
      "fips": "31123"
    },
    {
      "label": "Nance County",
      "fips": "31125"
    },
    {
      "label": "Nemaha County",
      "fips": "31127"
    },
    {
      "label": "Nuckolls County",
      "fips": "31129"
    },
    {
      "label": "Otoe County",
      "fips": "31131"
    },
    {
      "label": "Pawnee County",
      "fips": "31133"
    },
    {
      "label": "Perkins County",
      "fips": "31135"
    },
    {
      "label": "Phelps County",
      "fips": "31137"
    },
    {
      "label": "Pierce County",
      "fips": "31139"
    },
    {
      "label": "Platte County",
      "fips": "31141"
    },
    {
      "label": "Polk County",
      "fips": "31143"
    },
    {
      "label": "Red Willow County",
      "fips": "31145"
    },
    {
      "label": "Richardson County",
      "fips": "31147"
    },
    {
      "label": "Rock County",
      "fips": "31149"
    },
    {
      "label": "Saline County",
      "fips": "31151"
    },
    {
      "label": "Sarpy County",
      "fips": "31153"
    },
    {
      "label": "Saunders County",
      "fips": "31155"
    },
    {
      "label": "Scotts Bluff County",
      "fips": "31157"
    },
    {
      "label": "Seward County",
      "fips": "31159"
    },
    {
      "label": "Sheridan County",
      "fips": "31161"
    },
    {
      "label": "Sherman County",
      "fips": "31163"
    },
    {
      "label": "Sioux County",
      "fips": "31165"
    },
    {
      "label": "Stanton County",
      "fips": "31167"
    },
    {
      "label": "Thayer County",
      "fips": "31169"
    },
    {
      "label": "Thomas County",
      "fips": "31171"
    },
    {
      "label": "Thurston County",
      "fips": "31173"
    },
    {
      "label": "Valley County",
      "fips": "31175"
    },
    {
      "label": "Washington County",
      "fips": "31177"
    },
    {
      "label": "Wayne County",
      "fips": "31179"
    },
    {
      "label": "Webster County",
      "fips": "31181"
    },
    {
      "label": "Wheeler County",
      "fips": "31183"
    },
    {
      "label": "York County",
      "fips": "31185"
    }
  ],
  "NV": [
    {
      "label": "Churchill County",
      "fips": "32001"
    },
    {
      "label": "Clark County",
      "fips": "32003"
    },
    {
      "label": "Douglas County",
      "fips": "32005"
    },
    {
      "label": "Elko County",
      "fips": "32007"
    },
    {
      "label": "Esmeralda County",
      "fips": "32009"
    },
    {
      "label": "Eureka County",
      "fips": "32011"
    },
    {
      "label": "Humboldt County",
      "fips": "32013"
    },
    {
      "label": "Lander County",
      "fips": "32015"
    },
    {
      "label": "Lincoln County",
      "fips": "32017"
    },
    {
      "label": "Lyon County",
      "fips": "32019"
    },
    {
      "label": "Mineral County",
      "fips": "32021"
    },
    {
      "label": "Nye County",
      "fips": "32023"
    },
    {
      "label": "Pershing County",
      "fips": "32027"
    },
    {
      "label": "Storey County",
      "fips": "32029"
    },
    {
      "label": "Washoe County",
      "fips": "32031"
    },
    {
      "label": "White Pine County",
      "fips": "32033"
    },
    {
      "label": "Carson City",
      "fips": "32510"
    }
  ],
  "NH": [
    {
      "label": "Belknap County",
      "fips": "33001"
    },
    {
      "label": "Carroll County",
      "fips": "33003"
    },
    {
      "label": "Cheshire County",
      "fips": "33005"
    },
    {
      "label": "Coos County",
      "fips": "33007"
    },
    {
      "label": "Grafton County",
      "fips": "33009"
    },
    {
      "label": "Hillsborough County",
      "fips": "33011"
    },
    {
      "label": "Merrimack County",
      "fips": "33013"
    },
    {
      "label": "Rockingham County",
      "fips": "33015"
    },
    {
      "label": "Strafford County",
      "fips": "33017"
    },
    {
      "label": "Sullivan County",
      "fips": "33019"
    }
  ],
  "NJ": [
    {
      "label": "Atlantic County",
      "fips": "34001"
    },
    {
      "label": "Bergen County",
      "fips": "34003"
    },
    {
      "label": "Burlington County",
      "fips": "34005"
    },
    {
      "label": "Camden County",
      "fips": "34007"
    },
    {
      "label": "Cape May County",
      "fips": "34009"
    },
    {
      "label": "Cumberland County",
      "fips": "34011"
    },
    {
      "label": "Essex County",
      "fips": "34013"
    },
    {
      "label": "Gloucester County",
      "fips": "34015"
    },
    {
      "label": "Hudson County",
      "fips": "34017"
    },
    {
      "label": "Hunterdon County",
      "fips": "34019"
    },
    {
      "label": "Mercer County",
      "fips": "34021"
    },
    {
      "label": "Middlesex County",
      "fips": "34023"
    },
    {
      "label": "Monmouth County",
      "fips": "34025"
    },
    {
      "label": "Morris County",
      "fips": "34027"
    },
    {
      "label": "Ocean County",
      "fips": "34029"
    },
    {
      "label": "Passaic County",
      "fips": "34031"
    },
    {
      "label": "Salem County",
      "fips": "34033"
    },
    {
      "label": "Somerset County",
      "fips": "34035"
    },
    {
      "label": "Sussex County",
      "fips": "34037"
    },
    {
      "label": "Union County",
      "fips": "34039"
    },
    {
      "label": "Warren County",
      "fips": "34041"
    }
  ],
  "NM": [
    {
      "label": "Bernalillo County",
      "fips": "35001"
    },
    {
      "label": "Catron County",
      "fips": "35003"
    },
    {
      "label": "Chaves County",
      "fips": "35005"
    },
    {
      "label": "Cibola County",
      "fips": "35006"
    },
    {
      "label": "Colfax County",
      "fips": "35007"
    },
    {
      "label": "Curry County",
      "fips": "35009"
    },
    {
      "label": "De Baca County",
      "fips": "35011"
    },
    {
      "label": "Dona Ana County",
      "fips": "35013"
    },
    {
      "label": "Eddy County",
      "fips": "35015"
    },
    {
      "label": "Grant County",
      "fips": "35017"
    },
    {
      "label": "Guadalupe County",
      "fips": "35019"
    },
    {
      "label": "Harding County",
      "fips": "35021"
    },
    {
      "label": "Hidalgo County",
      "fips": "35023"
    },
    {
      "label": "Lea County",
      "fips": "35025"
    },
    {
      "label": "Lincoln County",
      "fips": "35027"
    },
    {
      "label": "Los Alamos County",
      "fips": "35028"
    },
    {
      "label": "Luna County",
      "fips": "35029"
    },
    {
      "label": "McKinley County",
      "fips": "35031"
    },
    {
      "label": "Mora County",
      "fips": "35033"
    },
    {
      "label": "Otero County",
      "fips": "35035"
    },
    {
      "label": "Quay County",
      "fips": "35037"
    },
    {
      "label": "Rio Arriba County",
      "fips": "35039"
    },
    {
      "label": "Roosevelt County",
      "fips": "35041"
    },
    {
      "label": "Sandoval County",
      "fips": "35043"
    },
    {
      "label": "San Juan County",
      "fips": "35045"
    },
    {
      "label": "San Miguel County",
      "fips": "35047"
    },
    {
      "label": "Santa Fe County",
      "fips": "35049"
    },
    {
      "label": "Sierra County",
      "fips": "35051"
    },
    {
      "label": "Socorro County",
      "fips": "35053"
    },
    {
      "label": "Taos County",
      "fips": "35055"
    },
    {
      "label": "Torrance County",
      "fips": "35057"
    },
    {
      "label": "Union County",
      "fips": "35059"
    },
    {
      "label": "Valencia County",
      "fips": "35061"
    }
  ],
  "NY": [
    {
      "label": "Albany County",
      "fips": "36001"
    },
    {
      "label": "Allegany County",
      "fips": "36003"
    },
    {
      "label": "Bronx County",
      "fips": "36005"
    },
    {
      "label": "Broome County",
      "fips": "36007"
    },
    {
      "label": "Cattaraugus County",
      "fips": "36009"
    },
    {
      "label": "Cayuga County",
      "fips": "36011"
    },
    {
      "label": "Chautauqua County",
      "fips": "36013"
    },
    {
      "label": "Chemung County",
      "fips": "36015"
    },
    {
      "label": "Chenango County",
      "fips": "36017"
    },
    {
      "label": "Clinton County",
      "fips": "36019"
    },
    {
      "label": "Columbia County",
      "fips": "36021"
    },
    {
      "label": "Cortland County",
      "fips": "36023"
    },
    {
      "label": "Delaware County",
      "fips": "36025"
    },
    {
      "label": "Dutchess County",
      "fips": "36027"
    },
    {
      "label": "Erie County",
      "fips": "36029"
    },
    {
      "label": "Essex County",
      "fips": "36031"
    },
    {
      "label": "Franklin County",
      "fips": "36033"
    },
    {
      "label": "Fulton County",
      "fips": "36035"
    },
    {
      "label": "Genesee County",
      "fips": "36037"
    },
    {
      "label": "Greene County",
      "fips": "36039"
    },
    {
      "label": "Hamilton County",
      "fips": "36041"
    },
    {
      "label": "Herkimer County",
      "fips": "36043"
    },
    {
      "label": "Jefferson County",
      "fips": "36045"
    },
    {
      "label": "Kings County",
      "fips": "36047"
    },
    {
      "label": "Lewis County",
      "fips": "36049"
    },
    {
      "label": "Livingston County",
      "fips": "36051"
    },
    {
      "label": "Madison County",
      "fips": "36053"
    },
    {
      "label": "Monroe County",
      "fips": "36055"
    },
    {
      "label": "Montgomery County",
      "fips": "36057"
    },
    {
      "label": "Nassau County",
      "fips": "36059"
    },
    {
      "label": "New York County",
      "fips": "36061"
    },
    {
      "label": "Niagara County",
      "fips": "36063"
    },
    {
      "label": "Oneida County",
      "fips": "36065"
    },
    {
      "label": "Onondaga County",
      "fips": "36067"
    },
    {
      "label": "Ontario County",
      "fips": "36069"
    },
    {
      "label": "Orange County",
      "fips": "36071"
    },
    {
      "label": "Orleans County",
      "fips": "36073"
    },
    {
      "label": "Oswego County",
      "fips": "36075"
    },
    {
      "label": "Otsego County",
      "fips": "36077"
    },
    {
      "label": "Putnam County",
      "fips": "36079"
    },
    {
      "label": "Queens County",
      "fips": "36081"
    },
    {
      "label": "Rensselaer County",
      "fips": "36083"
    },
    {
      "label": "Richmond County",
      "fips": "36085"
    },
    {
      "label": "Rockland County",
      "fips": "36087"
    },
    {
      "label": "St. Lawrence County",
      "fips": "36089"
    },
    {
      "label": "Saratoga County",
      "fips": "36091"
    },
    {
      "label": "Schenectady County",
      "fips": "36093"
    },
    {
      "label": "Schoharie County",
      "fips": "36095"
    },
    {
      "label": "Schuyler County",
      "fips": "36097"
    },
    {
      "label": "Seneca County",
      "fips": "36099"
    },
    {
      "label": "Steuben County",
      "fips": "36101"
    },
    {
      "label": "Suffolk County",
      "fips": "36103"
    },
    {
      "label": "Sullivan County",
      "fips": "36105"
    },
    {
      "label": "Tioga County",
      "fips": "36107"
    },
    {
      "label": "Tompkins County",
      "fips": "36109"
    },
    {
      "label": "Ulster County",
      "fips": "36111"
    },
    {
      "label": "Warren County",
      "fips": "36113"
    },
    {
      "label": "Washington County",
      "fips": "36115"
    },
    {
      "label": "Wayne County",
      "fips": "36117"
    },
    {
      "label": "Westchester County",
      "fips": "36119"
    },
    {
      "label": "Wyoming County",
      "fips": "36121"
    },
    {
      "label": "Yates County",
      "fips": "36123"
    }
  ],
  "NC": [
    {
      "label": "Alamance County",
      "fips": "37001"
    },
    {
      "label": "Alexander County",
      "fips": "37003"
    },
    {
      "label": "Alleghany County",
      "fips": "37005"
    },
    {
      "label": "Anson County",
      "fips": "37007"
    },
    {
      "label": "Ashe County",
      "fips": "37009"
    },
    {
      "label": "Avery County",
      "fips": "37011"
    },
    {
      "label": "Beaufort County",
      "fips": "37013"
    },
    {
      "label": "Bertie County",
      "fips": "37015"
    },
    {
      "label": "Bladen County",
      "fips": "37017"
    },
    {
      "label": "Brunswick County",
      "fips": "37019"
    },
    {
      "label": "Buncombe County",
      "fips": "37021"
    },
    {
      "label": "Burke County",
      "fips": "37023"
    },
    {
      "label": "Cabarrus County",
      "fips": "37025"
    },
    {
      "label": "Caldwell County",
      "fips": "37027"
    },
    {
      "label": "Camden County",
      "fips": "37029"
    },
    {
      "label": "Carteret County",
      "fips": "37031"
    },
    {
      "label": "Caswell County",
      "fips": "37033"
    },
    {
      "label": "Catawba County",
      "fips": "37035"
    },
    {
      "label": "Chatham County",
      "fips": "37037"
    },
    {
      "label": "Cherokee County",
      "fips": "37039"
    },
    {
      "label": "Chowan County",
      "fips": "37041"
    },
    {
      "label": "Clay County",
      "fips": "37043"
    },
    {
      "label": "Cleveland County",
      "fips": "37045"
    },
    {
      "label": "Columbus County",
      "fips": "37047"
    },
    {
      "label": "Craven County",
      "fips": "37049"
    },
    {
      "label": "Cumberland County",
      "fips": "37051"
    },
    {
      "label": "Currituck County",
      "fips": "37053"
    },
    {
      "label": "Dare County",
      "fips": "37055"
    },
    {
      "label": "Davidson County",
      "fips": "37057"
    },
    {
      "label": "Davie County",
      "fips": "37059"
    },
    {
      "label": "Duplin County",
      "fips": "37061"
    },
    {
      "label": "Durham County",
      "fips": "37063"
    },
    {
      "label": "Edgecombe County",
      "fips": "37065"
    },
    {
      "label": "Forsyth County",
      "fips": "37067"
    },
    {
      "label": "Franklin County",
      "fips": "37069"
    },
    {
      "label": "Gaston County",
      "fips": "37071"
    },
    {
      "label": "Gates County",
      "fips": "37073"
    },
    {
      "label": "Graham County",
      "fips": "37075"
    },
    {
      "label": "Granville County",
      "fips": "37077"
    },
    {
      "label": "Greene County",
      "fips": "37079"
    },
    {
      "label": "Guilford County",
      "fips": "37081"
    },
    {
      "label": "Halifax County",
      "fips": "37083"
    },
    {
      "label": "Harnett County",
      "fips": "37085"
    },
    {
      "label": "Haywood County",
      "fips": "37087"
    },
    {
      "label": "Henderson County",
      "fips": "37089"
    },
    {
      "label": "Hertford County",
      "fips": "37091"
    },
    {
      "label": "Hoke County",
      "fips": "37093"
    },
    {
      "label": "Hyde County",
      "fips": "37095"
    },
    {
      "label": "Iredell County",
      "fips": "37097"
    },
    {
      "label": "Jackson County",
      "fips": "37099"
    },
    {
      "label": "Johnston County",
      "fips": "37101"
    },
    {
      "label": "Jones County",
      "fips": "37103"
    },
    {
      "label": "Lee County",
      "fips": "37105"
    },
    {
      "label": "Lenoir County",
      "fips": "37107"
    },
    {
      "label": "Lincoln County",
      "fips": "37109"
    },
    {
      "label": "McDowell County",
      "fips": "37111"
    },
    {
      "label": "Macon County",
      "fips": "37113"
    },
    {
      "label": "Madison County",
      "fips": "37115"
    },
    {
      "label": "Martin County",
      "fips": "37117"
    },
    {
      "label": "Mecklenburg County",
      "fips": "37119"
    },
    {
      "label": "Mitchell County",
      "fips": "37121"
    },
    {
      "label": "Montgomery County",
      "fips": "37123"
    },
    {
      "label": "Moore County",
      "fips": "37125"
    },
    {
      "label": "Nash County",
      "fips": "37127"
    },
    {
      "label": "New Hanover County",
      "fips": "37129"
    },
    {
      "label": "Northampton County",
      "fips": "37131"
    },
    {
      "label": "Onslow County",
      "fips": "37133"
    },
    {
      "label": "Orange County",
      "fips": "37135"
    },
    {
      "label": "Pamlico County",
      "fips": "37137"
    },
    {
      "label": "Pasquotank County",
      "fips": "37139"
    },
    {
      "label": "Pender County",
      "fips": "37141"
    },
    {
      "label": "Perquimans County",
      "fips": "37143"
    },
    {
      "label": "Person County",
      "fips": "37145"
    },
    {
      "label": "Pitt County",
      "fips": "37147"
    },
    {
      "label": "Polk County",
      "fips": "37149"
    },
    {
      "label": "Randolph County",
      "fips": "37151"
    },
    {
      "label": "Richmond County",
      "fips": "37153"
    },
    {
      "label": "Robeson County",
      "fips": "37155"
    },
    {
      "label": "Rockingham County",
      "fips": "37157"
    },
    {
      "label": "Rowan County",
      "fips": "37159"
    },
    {
      "label": "Rutherford County",
      "fips": "37161"
    },
    {
      "label": "Sampson County",
      "fips": "37163"
    },
    {
      "label": "Scotland County",
      "fips": "37165"
    },
    {
      "label": "Stanly County",
      "fips": "37167"
    },
    {
      "label": "Stokes County",
      "fips": "37169"
    },
    {
      "label": "Surry County",
      "fips": "37171"
    },
    {
      "label": "Swain County",
      "fips": "37173"
    },
    {
      "label": "Transylvania County",
      "fips": "37175"
    },
    {
      "label": "Tyrrell County",
      "fips": "37177"
    },
    {
      "label": "Union County",
      "fips": "37179"
    },
    {
      "label": "Vance County",
      "fips": "37181"
    },
    {
      "label": "Wake County",
      "fips": "37183"
    },
    {
      "label": "Warren County",
      "fips": "37185"
    },
    {
      "label": "Washington County",
      "fips": "37187"
    },
    {
      "label": "Watauga County",
      "fips": "37189"
    },
    {
      "label": "Wayne County",
      "fips": "37191"
    },
    {
      "label": "Wilkes County",
      "fips": "37193"
    },
    {
      "label": "Wilson County",
      "fips": "37195"
    },
    {
      "label": "Yadkin County",
      "fips": "37197"
    },
    {
      "label": "Yancey County",
      "fips": "37199"
    }
  ],
  "ND": [
    {
      "label": "Adams County",
      "fips": "38001"
    },
    {
      "label": "Barnes County",
      "fips": "38003"
    },
    {
      "label": "Benson County",
      "fips": "38005"
    },
    {
      "label": "Billings County",
      "fips": "38007"
    },
    {
      "label": "Bottineau County",
      "fips": "38009"
    },
    {
      "label": "Bowman County",
      "fips": "38011"
    },
    {
      "label": "Burke County",
      "fips": "38013"
    },
    {
      "label": "Burleigh County",
      "fips": "38015"
    },
    {
      "label": "Cass County",
      "fips": "38017"
    },
    {
      "label": "Cavalier County",
      "fips": "38019"
    },
    {
      "label": "Dickey County",
      "fips": "38021"
    },
    {
      "label": "Divide County",
      "fips": "38023"
    },
    {
      "label": "Dunn County",
      "fips": "38025"
    },
    {
      "label": "Eddy County",
      "fips": "38027"
    },
    {
      "label": "Emmons County",
      "fips": "38029"
    },
    {
      "label": "Foster County",
      "fips": "38031"
    },
    {
      "label": "Golden Valley County",
      "fips": "38033"
    },
    {
      "label": "Grand Forks County",
      "fips": "38035"
    },
    {
      "label": "Grant County",
      "fips": "38037"
    },
    {
      "label": "Griggs County",
      "fips": "38039"
    },
    {
      "label": "Hettinger County",
      "fips": "38041"
    },
    {
      "label": "Kidder County",
      "fips": "38043"
    },
    {
      "label": "LaMoure County",
      "fips": "38045"
    },
    {
      "label": "Logan County",
      "fips": "38047"
    },
    {
      "label": "McHenry County",
      "fips": "38049"
    },
    {
      "label": "McIntosh County",
      "fips": "38051"
    },
    {
      "label": "McKenzie County",
      "fips": "38053"
    },
    {
      "label": "McLean County",
      "fips": "38055"
    },
    {
      "label": "Mercer County",
      "fips": "38057"
    },
    {
      "label": "Morton County",
      "fips": "38059"
    },
    {
      "label": "Mountrail County",
      "fips": "38061"
    },
    {
      "label": "Nelson County",
      "fips": "38063"
    },
    {
      "label": "Oliver County",
      "fips": "38065"
    },
    {
      "label": "Pembina County",
      "fips": "38067"
    },
    {
      "label": "Pierce County",
      "fips": "38069"
    },
    {
      "label": "Ramsey County",
      "fips": "38071"
    },
    {
      "label": "Ransom County",
      "fips": "38073"
    },
    {
      "label": "Renville County",
      "fips": "38075"
    },
    {
      "label": "Richland County",
      "fips": "38077"
    },
    {
      "label": "Rolette County",
      "fips": "38079"
    },
    {
      "label": "Sargent County",
      "fips": "38081"
    },
    {
      "label": "Sheridan County",
      "fips": "38083"
    },
    {
      "label": "Sioux County",
      "fips": "38085"
    },
    {
      "label": "Slope County",
      "fips": "38087"
    },
    {
      "label": "Stark County",
      "fips": "38089"
    },
    {
      "label": "Steele County",
      "fips": "38091"
    },
    {
      "label": "Stutsman County",
      "fips": "38093"
    },
    {
      "label": "Towner County",
      "fips": "38095"
    },
    {
      "label": "Traill County",
      "fips": "38097"
    },
    {
      "label": "Walsh County",
      "fips": "38099"
    },
    {
      "label": "Ward County",
      "fips": "38101"
    },
    {
      "label": "Wells County",
      "fips": "38103"
    },
    {
      "label": "Williams County",
      "fips": "38105"
    }
  ],
  "OH": [
    {
      "label": "Adams County",
      "fips": "39001"
    },
    {
      "label": "Allen County",
      "fips": "39003"
    },
    {
      "label": "Ashland County",
      "fips": "39005"
    },
    {
      "label": "Ashtabula County",
      "fips": "39007"
    },
    {
      "label": "Athens County",
      "fips": "39009"
    },
    {
      "label": "Auglaize County",
      "fips": "39011"
    },
    {
      "label": "Belmont County",
      "fips": "39013"
    },
    {
      "label": "Brown County",
      "fips": "39015"
    },
    {
      "label": "Butler County",
      "fips": "39017"
    },
    {
      "label": "Carroll County",
      "fips": "39019"
    },
    {
      "label": "Champaign County",
      "fips": "39021"
    },
    {
      "label": "Clark County",
      "fips": "39023"
    },
    {
      "label": "Clermont County",
      "fips": "39025"
    },
    {
      "label": "Clinton County",
      "fips": "39027"
    },
    {
      "label": "Columbiana County",
      "fips": "39029"
    },
    {
      "label": "Coshocton County",
      "fips": "39031"
    },
    {
      "label": "Crawford County",
      "fips": "39033"
    },
    {
      "label": "Cuyahoga County",
      "fips": "39035"
    },
    {
      "label": "Darke County",
      "fips": "39037"
    },
    {
      "label": "Defiance County",
      "fips": "39039"
    },
    {
      "label": "Delaware County",
      "fips": "39041"
    },
    {
      "label": "Erie County",
      "fips": "39043"
    },
    {
      "label": "Fairfield County",
      "fips": "39045"
    },
    {
      "label": "Fayette County",
      "fips": "39047"
    },
    {
      "label": "Franklin County",
      "fips": "39049"
    },
    {
      "label": "Fulton County",
      "fips": "39051"
    },
    {
      "label": "Gallia County",
      "fips": "39053"
    },
    {
      "label": "Geauga County",
      "fips": "39055"
    },
    {
      "label": "Greene County",
      "fips": "39057"
    },
    {
      "label": "Guernsey County",
      "fips": "39059"
    },
    {
      "label": "Hamilton County",
      "fips": "39061"
    },
    {
      "label": "Hancock County",
      "fips": "39063"
    },
    {
      "label": "Hardin County",
      "fips": "39065"
    },
    {
      "label": "Harrison County",
      "fips": "39067"
    },
    {
      "label": "Henry County",
      "fips": "39069"
    },
    {
      "label": "Highland County",
      "fips": "39071"
    },
    {
      "label": "Hocking County",
      "fips": "39073"
    },
    {
      "label": "Holmes County",
      "fips": "39075"
    },
    {
      "label": "Huron County",
      "fips": "39077"
    },
    {
      "label": "Jackson County",
      "fips": "39079"
    },
    {
      "label": "Jefferson County",
      "fips": "39081"
    },
    {
      "label": "Knox County",
      "fips": "39083"
    },
    {
      "label": "Lake County",
      "fips": "39085"
    },
    {
      "label": "Lawrence County",
      "fips": "39087"
    },
    {
      "label": "Licking County",
      "fips": "39089"
    },
    {
      "label": "Logan County",
      "fips": "39091"
    },
    {
      "label": "Lorain County",
      "fips": "39093"
    },
    {
      "label": "Lucas County",
      "fips": "39095"
    },
    {
      "label": "Madison County",
      "fips": "39097"
    },
    {
      "label": "Mahoning County",
      "fips": "39099"
    },
    {
      "label": "Marion County",
      "fips": "39101"
    },
    {
      "label": "Medina County",
      "fips": "39103"
    },
    {
      "label": "Meigs County",
      "fips": "39105"
    },
    {
      "label": "Mercer County",
      "fips": "39107"
    },
    {
      "label": "Miami County",
      "fips": "39109"
    },
    {
      "label": "Monroe County",
      "fips": "39111"
    },
    {
      "label": "Montgomery County",
      "fips": "39113"
    },
    {
      "label": "Morgan County",
      "fips": "39115"
    },
    {
      "label": "Morrow County",
      "fips": "39117"
    },
    {
      "label": "Muskingum County",
      "fips": "39119"
    },
    {
      "label": "Noble County",
      "fips": "39121"
    },
    {
      "label": "Ottawa County",
      "fips": "39123"
    },
    {
      "label": "Paulding County",
      "fips": "39125"
    },
    {
      "label": "Perry County",
      "fips": "39127"
    },
    {
      "label": "Pickaway County",
      "fips": "39129"
    },
    {
      "label": "Pike County",
      "fips": "39131"
    },
    {
      "label": "Portage County",
      "fips": "39133"
    },
    {
      "label": "Preble County",
      "fips": "39135"
    },
    {
      "label": "Putnam County",
      "fips": "39137"
    },
    {
      "label": "Richland County",
      "fips": "39139"
    },
    {
      "label": "Ross County",
      "fips": "39141"
    },
    {
      "label": "Sandusky County",
      "fips": "39143"
    },
    {
      "label": "Scioto County",
      "fips": "39145"
    },
    {
      "label": "Seneca County",
      "fips": "39147"
    },
    {
      "label": "Shelby County",
      "fips": "39149"
    },
    {
      "label": "Stark County",
      "fips": "39151"
    },
    {
      "label": "Summit County",
      "fips": "39153"
    },
    {
      "label": "Trumbull County",
      "fips": "39155"
    },
    {
      "label": "Tuscarawas County",
      "fips": "39157"
    },
    {
      "label": "Union County",
      "fips": "39159"
    },
    {
      "label": "Van Wert County",
      "fips": "39161"
    },
    {
      "label": "Vinton County",
      "fips": "39163"
    },
    {
      "label": "Warren County",
      "fips": "39165"
    },
    {
      "label": "Washington County",
      "fips": "39167"
    },
    {
      "label": "Wayne County",
      "fips": "39169"
    },
    {
      "label": "Williams County",
      "fips": "39171"
    },
    {
      "label": "Wood County",
      "fips": "39173"
    },
    {
      "label": "Wyandot County",
      "fips": "39175"
    }
  ],
  "OK": [
    {
      "label": "Adair County",
      "fips": "40001"
    },
    {
      "label": "Alfalfa County",
      "fips": "40003"
    },
    {
      "label": "Atoka County",
      "fips": "40005"
    },
    {
      "label": "Beaver County",
      "fips": "40007"
    },
    {
      "label": "Beckham County",
      "fips": "40009"
    },
    {
      "label": "Blaine County",
      "fips": "40011"
    },
    {
      "label": "Bryan County",
      "fips": "40013"
    },
    {
      "label": "Caddo County",
      "fips": "40015"
    },
    {
      "label": "Canadian County",
      "fips": "40017"
    },
    {
      "label": "Carter County",
      "fips": "40019"
    },
    {
      "label": "Cherokee County",
      "fips": "40021"
    },
    {
      "label": "Choctaw County",
      "fips": "40023"
    },
    {
      "label": "Cimarron County",
      "fips": "40025"
    },
    {
      "label": "Cleveland County",
      "fips": "40027"
    },
    {
      "label": "Coal County",
      "fips": "40029"
    },
    {
      "label": "Comanche County",
      "fips": "40031"
    },
    {
      "label": "Cotton County",
      "fips": "40033"
    },
    {
      "label": "Craig County",
      "fips": "40035"
    },
    {
      "label": "Creek County",
      "fips": "40037"
    },
    {
      "label": "Custer County",
      "fips": "40039"
    },
    {
      "label": "Delaware County",
      "fips": "40041"
    },
    {
      "label": "Dewey County",
      "fips": "40043"
    },
    {
      "label": "Ellis County",
      "fips": "40045"
    },
    {
      "label": "Garfield County",
      "fips": "40047"
    },
    {
      "label": "Garvin County",
      "fips": "40049"
    },
    {
      "label": "Grady County",
      "fips": "40051"
    },
    {
      "label": "Grant County",
      "fips": "40053"
    },
    {
      "label": "Greer County",
      "fips": "40055"
    },
    {
      "label": "Harmon County",
      "fips": "40057"
    },
    {
      "label": "Harper County",
      "fips": "40059"
    },
    {
      "label": "Haskell County",
      "fips": "40061"
    },
    {
      "label": "Hughes County",
      "fips": "40063"
    },
    {
      "label": "Jackson County",
      "fips": "40065"
    },
    {
      "label": "Jefferson County",
      "fips": "40067"
    },
    {
      "label": "Johnston County",
      "fips": "40069"
    },
    {
      "label": "Kay County",
      "fips": "40071"
    },
    {
      "label": "Kingfisher County",
      "fips": "40073"
    },
    {
      "label": "Kiowa County",
      "fips": "40075"
    },
    {
      "label": "Latimer County",
      "fips": "40077"
    },
    {
      "label": "Le Flore County",
      "fips": "40079"
    },
    {
      "label": "Lincoln County",
      "fips": "40081"
    },
    {
      "label": "Logan County",
      "fips": "40083"
    },
    {
      "label": "Love County",
      "fips": "40085"
    },
    {
      "label": "McClain County",
      "fips": "40087"
    },
    {
      "label": "McCurtain County",
      "fips": "40089"
    },
    {
      "label": "McIntosh County",
      "fips": "40091"
    },
    {
      "label": "Major County",
      "fips": "40093"
    },
    {
      "label": "Marshall County",
      "fips": "40095"
    },
    {
      "label": "Mayes County",
      "fips": "40097"
    },
    {
      "label": "Murray County",
      "fips": "40099"
    },
    {
      "label": "Muskogee County",
      "fips": "40101"
    },
    {
      "label": "Noble County",
      "fips": "40103"
    },
    {
      "label": "Nowata County",
      "fips": "40105"
    },
    {
      "label": "Okfuskee County",
      "fips": "40107"
    },
    {
      "label": "Oklahoma County",
      "fips": "40109"
    },
    {
      "label": "Okmulgee County",
      "fips": "40111"
    },
    {
      "label": "Osage County",
      "fips": "40113"
    },
    {
      "label": "Ottawa County",
      "fips": "40115"
    },
    {
      "label": "Pawnee County",
      "fips": "40117"
    },
    {
      "label": "Payne County",
      "fips": "40119"
    },
    {
      "label": "Pittsburg County",
      "fips": "40121"
    },
    {
      "label": "Pontotoc County",
      "fips": "40123"
    },
    {
      "label": "Pottawatomie County",
      "fips": "40125"
    },
    {
      "label": "Pushmataha County",
      "fips": "40127"
    },
    {
      "label": "Roger Mills County",
      "fips": "40129"
    },
    {
      "label": "Rogers County",
      "fips": "40131"
    },
    {
      "label": "Seminole County",
      "fips": "40133"
    },
    {
      "label": "Sequoyah County",
      "fips": "40135"
    },
    {
      "label": "Stephens County",
      "fips": "40137"
    },
    {
      "label": "Texas County",
      "fips": "40139"
    },
    {
      "label": "Tillman County",
      "fips": "40141"
    },
    {
      "label": "Tulsa County",
      "fips": "40143"
    },
    {
      "label": "Wagoner County",
      "fips": "40145"
    },
    {
      "label": "Washington County",
      "fips": "40147"
    },
    {
      "label": "Washita County",
      "fips": "40149"
    },
    {
      "label": "Woods County",
      "fips": "40151"
    },
    {
      "label": "Woodward County",
      "fips": "40153"
    }
  ],
  "OR": [
    {
      "label": "Baker County",
      "fips": "41001"
    },
    {
      "label": "Benton County",
      "fips": "41003"
    },
    {
      "label": "Clackamas County",
      "fips": "41005"
    },
    {
      "label": "Clatsop County",
      "fips": "41007"
    },
    {
      "label": "Columbia County",
      "fips": "41009"
    },
    {
      "label": "Coos County",
      "fips": "41011"
    },
    {
      "label": "Crook County",
      "fips": "41013"
    },
    {
      "label": "Curry County",
      "fips": "41015"
    },
    {
      "label": "Deschutes County",
      "fips": "41017"
    },
    {
      "label": "Douglas County",
      "fips": "41019"
    },
    {
      "label": "Gilliam County",
      "fips": "41021"
    },
    {
      "label": "Grant County",
      "fips": "41023"
    },
    {
      "label": "Harney County",
      "fips": "41025"
    },
    {
      "label": "Hood River County",
      "fips": "41027"
    },
    {
      "label": "Jackson County",
      "fips": "41029"
    },
    {
      "label": "Jefferson County",
      "fips": "41031"
    },
    {
      "label": "Josephine County",
      "fips": "41033"
    },
    {
      "label": "Klamath County",
      "fips": "41035"
    },
    {
      "label": "Lake County",
      "fips": "41037"
    },
    {
      "label": "Lane County",
      "fips": "41039"
    },
    {
      "label": "Lincoln County",
      "fips": "41041"
    },
    {
      "label": "Linn County",
      "fips": "41043"
    },
    {
      "label": "Malheur County",
      "fips": "41045"
    },
    {
      "label": "Marion County",
      "fips": "41047"
    },
    {
      "label": "Morrow County",
      "fips": "41049"
    },
    {
      "label": "Multnomah County",
      "fips": "41051"
    },
    {
      "label": "Polk County",
      "fips": "41053"
    },
    {
      "label": "Sherman County",
      "fips": "41055"
    },
    {
      "label": "Tillamook County",
      "fips": "41057"
    },
    {
      "label": "Umatilla County",
      "fips": "41059"
    },
    {
      "label": "Union County",
      "fips": "41061"
    },
    {
      "label": "Wallowa County",
      "fips": "41063"
    },
    {
      "label": "Wasco County",
      "fips": "41065"
    },
    {
      "label": "Washington County",
      "fips": "41067"
    },
    {
      "label": "Wheeler County",
      "fips": "41069"
    },
    {
      "label": "Yamhill County",
      "fips": "41071"
    }
  ],
  "PA": [
    {
      "label": "Adams County",
      "fips": "42001"
    },
    {
      "label": "Allegheny County",
      "fips": "42003"
    },
    {
      "label": "Armstrong County",
      "fips": "42005"
    },
    {
      "label": "Beaver County",
      "fips": "42007"
    },
    {
      "label": "Bedford County",
      "fips": "42009"
    },
    {
      "label": "Berks County",
      "fips": "42011"
    },
    {
      "label": "Blair County",
      "fips": "42013"
    },
    {
      "label": "Bradford County",
      "fips": "42015"
    },
    {
      "label": "Bucks County",
      "fips": "42017"
    },
    {
      "label": "Butler County",
      "fips": "42019"
    },
    {
      "label": "Cambria County",
      "fips": "42021"
    },
    {
      "label": "Cameron County",
      "fips": "42023"
    },
    {
      "label": "Carbon County",
      "fips": "42025"
    },
    {
      "label": "Centre County",
      "fips": "42027"
    },
    {
      "label": "Chester County",
      "fips": "42029"
    },
    {
      "label": "Clarion County",
      "fips": "42031"
    },
    {
      "label": "Clearfield County",
      "fips": "42033"
    },
    {
      "label": "Clinton County",
      "fips": "42035"
    },
    {
      "label": "Columbia County",
      "fips": "42037"
    },
    {
      "label": "Crawford County",
      "fips": "42039"
    },
    {
      "label": "Cumberland County",
      "fips": "42041"
    },
    {
      "label": "Dauphin County",
      "fips": "42043"
    },
    {
      "label": "Delaware County",
      "fips": "42045"
    },
    {
      "label": "Elk County",
      "fips": "42047"
    },
    {
      "label": "Erie County",
      "fips": "42049"
    },
    {
      "label": "Fayette County",
      "fips": "42051"
    },
    {
      "label": "Forest County",
      "fips": "42053"
    },
    {
      "label": "Franklin County",
      "fips": "42055"
    },
    {
      "label": "Fulton County",
      "fips": "42057"
    },
    {
      "label": "Greene County",
      "fips": "42059"
    },
    {
      "label": "Huntingdon County",
      "fips": "42061"
    },
    {
      "label": "Indiana County",
      "fips": "42063"
    },
    {
      "label": "Jefferson County",
      "fips": "42065"
    },
    {
      "label": "Juniata County",
      "fips": "42067"
    },
    {
      "label": "Lackawanna County",
      "fips": "42069"
    },
    {
      "label": "Lancaster County",
      "fips": "42071"
    },
    {
      "label": "Lawrence County",
      "fips": "42073"
    },
    {
      "label": "Lebanon County",
      "fips": "42075"
    },
    {
      "label": "Lehigh County",
      "fips": "42077"
    },
    {
      "label": "Luzerne County",
      "fips": "42079"
    },
    {
      "label": "Lycoming County",
      "fips": "42081"
    },
    {
      "label": "McKean County",
      "fips": "42083"
    },
    {
      "label": "Mercer County",
      "fips": "42085"
    },
    {
      "label": "Mifflin County",
      "fips": "42087"
    },
    {
      "label": "Monroe County",
      "fips": "42089"
    },
    {
      "label": "Montgomery County",
      "fips": "42091"
    },
    {
      "label": "Montour County",
      "fips": "42093"
    },
    {
      "label": "Northampton County",
      "fips": "42095"
    },
    {
      "label": "Northumberland County",
      "fips": "42097"
    },
    {
      "label": "Perry County",
      "fips": "42099"
    },
    {
      "label": "Philadelphia County",
      "fips": "42101"
    },
    {
      "label": "Pike County",
      "fips": "42103"
    },
    {
      "label": "Potter County",
      "fips": "42105"
    },
    {
      "label": "Schuylkill County",
      "fips": "42107"
    },
    {
      "label": "Snyder County",
      "fips": "42109"
    },
    {
      "label": "Somerset County",
      "fips": "42111"
    },
    {
      "label": "Sullivan County",
      "fips": "42113"
    },
    {
      "label": "Susquehanna County",
      "fips": "42115"
    },
    {
      "label": "Tioga County",
      "fips": "42117"
    },
    {
      "label": "Union County",
      "fips": "42119"
    },
    {
      "label": "Venango County",
      "fips": "42121"
    },
    {
      "label": "Warren County",
      "fips": "42123"
    },
    {
      "label": "Washington County",
      "fips": "42125"
    },
    {
      "label": "Wayne County",
      "fips": "42127"
    },
    {
      "label": "Westmoreland County",
      "fips": "42129"
    },
    {
      "label": "Wyoming County",
      "fips": "42131"
    },
    {
      "label": "York County",
      "fips": "42133"
    }
  ],
  "RI": [
    {
      "label": "Bristol County",
      "fips": "44001"
    },
    {
      "label": "Kent County",
      "fips": "44003"
    },
    {
      "label": "Newport County",
      "fips": "44005"
    },
    {
      "label": "Providence County",
      "fips": "44007"
    },
    {
      "label": "Washington County",
      "fips": "44009"
    }
  ],
  "SC": [
    {
      "label": "Abbeville County",
      "fips": "45001"
    },
    {
      "label": "Aiken County",
      "fips": "45003"
    },
    {
      "label": "Allendale County",
      "fips": "45005"
    },
    {
      "label": "Anderson County",
      "fips": "45007"
    },
    {
      "label": "Bamberg County",
      "fips": "45009"
    },
    {
      "label": "Barnwell County",
      "fips": "45011"
    },
    {
      "label": "Beaufort County",
      "fips": "45013"
    },
    {
      "label": "Berkeley County",
      "fips": "45015"
    },
    {
      "label": "Calhoun County",
      "fips": "45017"
    },
    {
      "label": "Charleston County",
      "fips": "45019"
    },
    {
      "label": "Cherokee County",
      "fips": "45021"
    },
    {
      "label": "Chester County",
      "fips": "45023"
    },
    {
      "label": "Chesterfield County",
      "fips": "45025"
    },
    {
      "label": "Clarendon County",
      "fips": "45027"
    },
    {
      "label": "Colleton County",
      "fips": "45029"
    },
    {
      "label": "Darlington County",
      "fips": "45031"
    },
    {
      "label": "Dillon County",
      "fips": "45033"
    },
    {
      "label": "Dorchester County",
      "fips": "45035"
    },
    {
      "label": "Edgefield County",
      "fips": "45037"
    },
    {
      "label": "Fairfield County",
      "fips": "45039"
    },
    {
      "label": "Florence County",
      "fips": "45041"
    },
    {
      "label": "Georgetown County",
      "fips": "45043"
    },
    {
      "label": "Greenville County",
      "fips": "45045"
    },
    {
      "label": "Greenwood County",
      "fips": "45047"
    },
    {
      "label": "Hampton County",
      "fips": "45049"
    },
    {
      "label": "Horry County",
      "fips": "45051"
    },
    {
      "label": "Jasper County",
      "fips": "45053"
    },
    {
      "label": "Kershaw County",
      "fips": "45055"
    },
    {
      "label": "Lancaster County",
      "fips": "45057"
    },
    {
      "label": "Laurens County",
      "fips": "45059"
    },
    {
      "label": "Lee County",
      "fips": "45061"
    },
    {
      "label": "Lexington County",
      "fips": "45063"
    },
    {
      "label": "McCormick County",
      "fips": "45065"
    },
    {
      "label": "Marion County",
      "fips": "45067"
    },
    {
      "label": "Marlboro County",
      "fips": "45069"
    },
    {
      "label": "Newberry County",
      "fips": "45071"
    },
    {
      "label": "Oconee County",
      "fips": "45073"
    },
    {
      "label": "Orangeburg County",
      "fips": "45075"
    },
    {
      "label": "Pickens County",
      "fips": "45077"
    },
    {
      "label": "Richland County",
      "fips": "45079"
    },
    {
      "label": "Saluda County",
      "fips": "45081"
    },
    {
      "label": "Spartanburg County",
      "fips": "45083"
    },
    {
      "label": "Sumter County",
      "fips": "45085"
    },
    {
      "label": "Union County",
      "fips": "45087"
    },
    {
      "label": "Williamsburg County",
      "fips": "45089"
    },
    {
      "label": "York County",
      "fips": "45091"
    }
  ],
  "SD": [
    {
      "label": "Aurora County",
      "fips": "46003"
    },
    {
      "label": "Beadle County",
      "fips": "46005"
    },
    {
      "label": "Bennett County",
      "fips": "46007"
    },
    {
      "label": "Bon Homme County",
      "fips": "46009"
    },
    {
      "label": "Brookings County",
      "fips": "46011"
    },
    {
      "label": "Brown County",
      "fips": "46013"
    },
    {
      "label": "Brule County",
      "fips": "46015"
    },
    {
      "label": "Buffalo County",
      "fips": "46017"
    },
    {
      "label": "Butte County",
      "fips": "46019"
    },
    {
      "label": "Campbell County",
      "fips": "46021"
    },
    {
      "label": "Charles Mix County",
      "fips": "46023"
    },
    {
      "label": "Clark County",
      "fips": "46025"
    },
    {
      "label": "Clay County",
      "fips": "46027"
    },
    {
      "label": "Codington County",
      "fips": "46029"
    },
    {
      "label": "Corson County",
      "fips": "46031"
    },
    {
      "label": "Custer County",
      "fips": "46033"
    },
    {
      "label": "Davison County",
      "fips": "46035"
    },
    {
      "label": "Day County",
      "fips": "46037"
    },
    {
      "label": "Deuel County",
      "fips": "46039"
    },
    {
      "label": "Dewey County",
      "fips": "46041"
    },
    {
      "label": "Douglas County",
      "fips": "46043"
    },
    {
      "label": "Edmunds County",
      "fips": "46045"
    },
    {
      "label": "Fall River County",
      "fips": "46047"
    },
    {
      "label": "Faulk County",
      "fips": "46049"
    },
    {
      "label": "Grant County",
      "fips": "46051"
    },
    {
      "label": "Gregory County",
      "fips": "46053"
    },
    {
      "label": "Haakon County",
      "fips": "46055"
    },
    {
      "label": "Hamlin County",
      "fips": "46057"
    },
    {
      "label": "Hand County",
      "fips": "46059"
    },
    {
      "label": "Hanson County",
      "fips": "46061"
    },
    {
      "label": "Harding County",
      "fips": "46063"
    },
    {
      "label": "Hughes County",
      "fips": "46065"
    },
    {
      "label": "Hutchinson County",
      "fips": "46067"
    },
    {
      "label": "Hyde County",
      "fips": "46069"
    },
    {
      "label": "Jackson County",
      "fips": "46071"
    },
    {
      "label": "Jerauld County",
      "fips": "46073"
    },
    {
      "label": "Jones County",
      "fips": "46075"
    },
    {
      "label": "Kingsbury County",
      "fips": "46077"
    },
    {
      "label": "Lake County",
      "fips": "46079"
    },
    {
      "label": "Lawrence County",
      "fips": "46081"
    },
    {
      "label": "Lincoln County",
      "fips": "46083"
    },
    {
      "label": "Lyman County",
      "fips": "46085"
    },
    {
      "label": "McCook County",
      "fips": "46087"
    },
    {
      "label": "McPherson County",
      "fips": "46089"
    },
    {
      "label": "Marshall County",
      "fips": "46091"
    },
    {
      "label": "Meade County",
      "fips": "46093"
    },
    {
      "label": "Mellette County",
      "fips": "46095"
    },
    {
      "label": "Miner County",
      "fips": "46097"
    },
    {
      "label": "Minnehaha County",
      "fips": "46099"
    },
    {
      "label": "Moody County",
      "fips": "46101"
    },
    {
      "label": "Pennington County",
      "fips": "46103"
    },
    {
      "label": "Perkins County",
      "fips": "46105"
    },
    {
      "label": "Potter County",
      "fips": "46107"
    },
    {
      "label": "Roberts County",
      "fips": "46109"
    },
    {
      "label": "Sanborn County",
      "fips": "46111"
    },
    {
      "label": "Shannon County",
      "fips": "46113"
    },
    {
      "label": "Spink County",
      "fips": "46115"
    },
    {
      "label": "Stanley County",
      "fips": "46117"
    },
    {
      "label": "Sully County",
      "fips": "46119"
    },
    {
      "label": "Todd County",
      "fips": "46121"
    },
    {
      "label": "Tripp County",
      "fips": "46123"
    },
    {
      "label": "Turner County",
      "fips": "46125"
    },
    {
      "label": "Union County",
      "fips": "46127"
    },
    {
      "label": "Walworth County",
      "fips": "46129"
    },
    {
      "label": "Yankton County",
      "fips": "46135"
    },
    {
      "label": "Ziebach County",
      "fips": "46137"
    }
  ],
  "TN": [
    {
      "label": "Anderson County",
      "fips": "47001"
    },
    {
      "label": "Bedford County",
      "fips": "47003"
    },
    {
      "label": "Benton County",
      "fips": "47005"
    },
    {
      "label": "Bledsoe County",
      "fips": "47007"
    },
    {
      "label": "Blount County",
      "fips": "47009"
    },
    {
      "label": "Bradley County",
      "fips": "47011"
    },
    {
      "label": "Campbell County",
      "fips": "47013"
    },
    {
      "label": "Cannon County",
      "fips": "47015"
    },
    {
      "label": "Carroll County",
      "fips": "47017"
    },
    {
      "label": "Carter County",
      "fips": "47019"
    },
    {
      "label": "Cheatham County",
      "fips": "47021"
    },
    {
      "label": "Chester County",
      "fips": "47023"
    },
    {
      "label": "Claiborne County",
      "fips": "47025"
    },
    {
      "label": "Clay County",
      "fips": "47027"
    },
    {
      "label": "Cocke County",
      "fips": "47029"
    },
    {
      "label": "Coffee County",
      "fips": "47031"
    },
    {
      "label": "Crockett County",
      "fips": "47033"
    },
    {
      "label": "Cumberland County",
      "fips": "47035"
    },
    {
      "label": "Davidson County",
      "fips": "47037"
    },
    {
      "label": "Decatur County",
      "fips": "47039"
    },
    {
      "label": "DeKalb County",
      "fips": "47041"
    },
    {
      "label": "Dickson County",
      "fips": "47043"
    },
    {
      "label": "Dyer County",
      "fips": "47045"
    },
    {
      "label": "Fayette County",
      "fips": "47047"
    },
    {
      "label": "Fentress County",
      "fips": "47049"
    },
    {
      "label": "Franklin County",
      "fips": "47051"
    },
    {
      "label": "Gibson County",
      "fips": "47053"
    },
    {
      "label": "Giles County",
      "fips": "47055"
    },
    {
      "label": "Grainger County",
      "fips": "47057"
    },
    {
      "label": "Greene County",
      "fips": "47059"
    },
    {
      "label": "Grundy County",
      "fips": "47061"
    },
    {
      "label": "Hamblen County",
      "fips": "47063"
    },
    {
      "label": "Hamilton County",
      "fips": "47065"
    },
    {
      "label": "Hancock County",
      "fips": "47067"
    },
    {
      "label": "Hardeman County",
      "fips": "47069"
    },
    {
      "label": "Hardin County",
      "fips": "47071"
    },
    {
      "label": "Hawkins County",
      "fips": "47073"
    },
    {
      "label": "Haywood County",
      "fips": "47075"
    },
    {
      "label": "Henderson County",
      "fips": "47077"
    },
    {
      "label": "Henry County",
      "fips": "47079"
    },
    {
      "label": "Hickman County",
      "fips": "47081"
    },
    {
      "label": "Houston County",
      "fips": "47083"
    },
    {
      "label": "Humphreys County",
      "fips": "47085"
    },
    {
      "label": "Jackson County",
      "fips": "47087"
    },
    {
      "label": "Jefferson County",
      "fips": "47089"
    },
    {
      "label": "Johnson County",
      "fips": "47091"
    },
    {
      "label": "Knox County",
      "fips": "47093"
    },
    {
      "label": "Lake County",
      "fips": "47095"
    },
    {
      "label": "Lauderdale County",
      "fips": "47097"
    },
    {
      "label": "Lawrence County",
      "fips": "47099"
    },
    {
      "label": "Lewis County",
      "fips": "47101"
    },
    {
      "label": "Lincoln County",
      "fips": "47103"
    },
    {
      "label": "Loudon County",
      "fips": "47105"
    },
    {
      "label": "McMinn County",
      "fips": "47107"
    },
    {
      "label": "McNairy County",
      "fips": "47109"
    },
    {
      "label": "Macon County",
      "fips": "47111"
    },
    {
      "label": "Madison County",
      "fips": "47113"
    },
    {
      "label": "Marion County",
      "fips": "47115"
    },
    {
      "label": "Marshall County",
      "fips": "47117"
    },
    {
      "label": "Maury County",
      "fips": "47119"
    },
    {
      "label": "Meigs County",
      "fips": "47121"
    },
    {
      "label": "Monroe County",
      "fips": "47123"
    },
    {
      "label": "Montgomery County",
      "fips": "47125"
    },
    {
      "label": "Moore County",
      "fips": "47127"
    },
    {
      "label": "Morgan County",
      "fips": "47129"
    },
    {
      "label": "Obion County",
      "fips": "47131"
    },
    {
      "label": "Overton County",
      "fips": "47133"
    },
    {
      "label": "Perry County",
      "fips": "47135"
    },
    {
      "label": "Pickett County",
      "fips": "47137"
    },
    {
      "label": "Polk County",
      "fips": "47139"
    },
    {
      "label": "Putnam County",
      "fips": "47141"
    },
    {
      "label": "Rhea County",
      "fips": "47143"
    },
    {
      "label": "Roane County",
      "fips": "47145"
    },
    {
      "label": "Robertson County",
      "fips": "47147"
    },
    {
      "label": "Rutherford County",
      "fips": "47149"
    },
    {
      "label": "Scott County",
      "fips": "47151"
    },
    {
      "label": "Sequatchie County",
      "fips": "47153"
    },
    {
      "label": "Sevier County",
      "fips": "47155"
    },
    {
      "label": "Shelby County",
      "fips": "47157"
    },
    {
      "label": "Smith County",
      "fips": "47159"
    },
    {
      "label": "Stewart County",
      "fips": "47161"
    },
    {
      "label": "Sullivan County",
      "fips": "47163"
    },
    {
      "label": "Sumner County",
      "fips": "47165"
    },
    {
      "label": "Tipton County",
      "fips": "47167"
    },
    {
      "label": "Trousdale County",
      "fips": "47169"
    },
    {
      "label": "Unicoi County",
      "fips": "47171"
    },
    {
      "label": "Union County",
      "fips": "47173"
    },
    {
      "label": "Van Buren County",
      "fips": "47175"
    },
    {
      "label": "Warren County",
      "fips": "47177"
    },
    {
      "label": "Washington County",
      "fips": "47179"
    },
    {
      "label": "Wayne County",
      "fips": "47181"
    },
    {
      "label": "Weakley County",
      "fips": "47183"
    },
    {
      "label": "White County",
      "fips": "47185"
    },
    {
      "label": "Williamson County",
      "fips": "47187"
    },
    {
      "label": "Wilson County",
      "fips": "47189"
    }
  ],
  "TX": [
    {
      "label": "Anderson County",
      "fips": "48001"
    },
    {
      "label": "Andrews County",
      "fips": "48003"
    },
    {
      "label": "Angelina County",
      "fips": "48005"
    },
    {
      "label": "Aransas County",
      "fips": "48007"
    },
    {
      "label": "Archer County",
      "fips": "48009"
    },
    {
      "label": "Armstrong County",
      "fips": "48011"
    },
    {
      "label": "Atascosa County",
      "fips": "48013"
    },
    {
      "label": "Austin County",
      "fips": "48015"
    },
    {
      "label": "Bailey County",
      "fips": "48017"
    },
    {
      "label": "Bandera County",
      "fips": "48019"
    },
    {
      "label": "Bastrop County",
      "fips": "48021"
    },
    {
      "label": "Baylor County",
      "fips": "48023"
    },
    {
      "label": "Bee County",
      "fips": "48025"
    },
    {
      "label": "Bell County",
      "fips": "48027"
    },
    {
      "label": "Bexar County",
      "fips": "48029"
    },
    {
      "label": "Blanco County",
      "fips": "48031"
    },
    {
      "label": "Borden County",
      "fips": "48033"
    },
    {
      "label": "Bosque County",
      "fips": "48035"
    },
    {
      "label": "Bowie County",
      "fips": "48037"
    },
    {
      "label": "Brazoria County",
      "fips": "48039"
    },
    {
      "label": "Brazos County",
      "fips": "48041"
    },
    {
      "label": "Brewster County",
      "fips": "48043"
    },
    {
      "label": "Briscoe County",
      "fips": "48045"
    },
    {
      "label": "Brooks County",
      "fips": "48047"
    },
    {
      "label": "Brown County",
      "fips": "48049"
    },
    {
      "label": "Burleson County",
      "fips": "48051"
    },
    {
      "label": "Burnet County",
      "fips": "48053"
    },
    {
      "label": "Caldwell County",
      "fips": "48055"
    },
    {
      "label": "Calhoun County",
      "fips": "48057"
    },
    {
      "label": "Callahan County",
      "fips": "48059"
    },
    {
      "label": "Cameron County",
      "fips": "48061"
    },
    {
      "label": "Camp County",
      "fips": "48063"
    },
    {
      "label": "Carson County",
      "fips": "48065"
    },
    {
      "label": "Cass County",
      "fips": "48067"
    },
    {
      "label": "Castro County",
      "fips": "48069"
    },
    {
      "label": "Chambers County",
      "fips": "48071"
    },
    {
      "label": "Cherokee County",
      "fips": "48073"
    },
    {
      "label": "Childress County",
      "fips": "48075"
    },
    {
      "label": "Clay County",
      "fips": "48077"
    },
    {
      "label": "Cochran County",
      "fips": "48079"
    },
    {
      "label": "Coke County",
      "fips": "48081"
    },
    {
      "label": "Coleman County",
      "fips": "48083"
    },
    {
      "label": "Collin County",
      "fips": "48085"
    },
    {
      "label": "Collingsworth County",
      "fips": "48087"
    },
    {
      "label": "Colorado County",
      "fips": "48089"
    },
    {
      "label": "Comal County",
      "fips": "48091"
    },
    {
      "label": "Comanche County",
      "fips": "48093"
    },
    {
      "label": "Concho County",
      "fips": "48095"
    },
    {
      "label": "Cooke County",
      "fips": "48097"
    },
    {
      "label": "Coryell County",
      "fips": "48099"
    },
    {
      "label": "Cottle County",
      "fips": "48101"
    },
    {
      "label": "Crane County",
      "fips": "48103"
    },
    {
      "label": "Crockett County",
      "fips": "48105"
    },
    {
      "label": "Crosby County",
      "fips": "48107"
    },
    {
      "label": "Culberson County",
      "fips": "48109"
    },
    {
      "label": "Dallam County",
      "fips": "48111"
    },
    {
      "label": "Dallas County",
      "fips": "48113"
    },
    {
      "label": "Dawson County",
      "fips": "48115"
    },
    {
      "label": "Deaf Smith County",
      "fips": "48117"
    },
    {
      "label": "Delta County",
      "fips": "48119"
    },
    {
      "label": "Denton County",
      "fips": "48121"
    },
    {
      "label": "DeWitt County",
      "fips": "48123"
    },
    {
      "label": "Dickens County",
      "fips": "48125"
    },
    {
      "label": "Dimmit County",
      "fips": "48127"
    },
    {
      "label": "Donley County",
      "fips": "48129"
    },
    {
      "label": "Duval County",
      "fips": "48131"
    },
    {
      "label": "Eastland County",
      "fips": "48133"
    },
    {
      "label": "Ector County",
      "fips": "48135"
    },
    {
      "label": "Edwards County",
      "fips": "48137"
    },
    {
      "label": "Ellis County",
      "fips": "48139"
    },
    {
      "label": "El Paso County",
      "fips": "48141"
    },
    {
      "label": "Erath County",
      "fips": "48143"
    },
    {
      "label": "Falls County",
      "fips": "48145"
    },
    {
      "label": "Fannin County",
      "fips": "48147"
    },
    {
      "label": "Fayette County",
      "fips": "48149"
    },
    {
      "label": "Fisher County",
      "fips": "48151"
    },
    {
      "label": "Floyd County",
      "fips": "48153"
    },
    {
      "label": "Foard County",
      "fips": "48155"
    },
    {
      "label": "Fort Bend County",
      "fips": "48157"
    },
    {
      "label": "Franklin County",
      "fips": "48159"
    },
    {
      "label": "Freestone County",
      "fips": "48161"
    },
    {
      "label": "Frio County",
      "fips": "48163"
    },
    {
      "label": "Gaines County",
      "fips": "48165"
    },
    {
      "label": "Galveston County",
      "fips": "48167"
    },
    {
      "label": "Garza County",
      "fips": "48169"
    },
    {
      "label": "Gillespie County",
      "fips": "48171"
    },
    {
      "label": "Glasscock County",
      "fips": "48173"
    },
    {
      "label": "Goliad County",
      "fips": "48175"
    },
    {
      "label": "Gonzales County",
      "fips": "48177"
    },
    {
      "label": "Gray County",
      "fips": "48179"
    },
    {
      "label": "Grayson County",
      "fips": "48181"
    },
    {
      "label": "Gregg County",
      "fips": "48183"
    },
    {
      "label": "Grimes County",
      "fips": "48185"
    },
    {
      "label": "Guadalupe County",
      "fips": "48187"
    },
    {
      "label": "Hale County",
      "fips": "48189"
    },
    {
      "label": "Hall County",
      "fips": "48191"
    },
    {
      "label": "Hamilton County",
      "fips": "48193"
    },
    {
      "label": "Hansford County",
      "fips": "48195"
    },
    {
      "label": "Hardeman County",
      "fips": "48197"
    },
    {
      "label": "Hardin County",
      "fips": "48199"
    },
    {
      "label": "Harris County",
      "fips": "48201"
    },
    {
      "label": "Harrison County",
      "fips": "48203"
    },
    {
      "label": "Hartley County",
      "fips": "48205"
    },
    {
      "label": "Haskell County",
      "fips": "48207"
    },
    {
      "label": "Hays County",
      "fips": "48209"
    },
    {
      "label": "Hemphill County",
      "fips": "48211"
    },
    {
      "label": "Henderson County",
      "fips": "48213"
    },
    {
      "label": "Hidalgo County",
      "fips": "48215"
    },
    {
      "label": "Hill County",
      "fips": "48217"
    },
    {
      "label": "Hockley County",
      "fips": "48219"
    },
    {
      "label": "Hood County",
      "fips": "48221"
    },
    {
      "label": "Hopkins County",
      "fips": "48223"
    },
    {
      "label": "Houston County",
      "fips": "48225"
    },
    {
      "label": "Howard County",
      "fips": "48227"
    },
    {
      "label": "Hudspeth County",
      "fips": "48229"
    },
    {
      "label": "Hunt County",
      "fips": "48231"
    },
    {
      "label": "Hutchinson County",
      "fips": "48233"
    },
    {
      "label": "Irion County",
      "fips": "48235"
    },
    {
      "label": "Jack County",
      "fips": "48237"
    },
    {
      "label": "Jackson County",
      "fips": "48239"
    },
    {
      "label": "Jasper County",
      "fips": "48241"
    },
    {
      "label": "Jeff Davis County",
      "fips": "48243"
    },
    {
      "label": "Jefferson County",
      "fips": "48245"
    },
    {
      "label": "Jim Hogg County",
      "fips": "48247"
    },
    {
      "label": "Jim Wells County",
      "fips": "48249"
    },
    {
      "label": "Johnson County",
      "fips": "48251"
    },
    {
      "label": "Jones County",
      "fips": "48253"
    },
    {
      "label": "Karnes County",
      "fips": "48255"
    },
    {
      "label": "Kaufman County",
      "fips": "48257"
    },
    {
      "label": "Kendall County",
      "fips": "48259"
    },
    {
      "label": "Kenedy County",
      "fips": "48261"
    },
    {
      "label": "Kent County",
      "fips": "48263"
    },
    {
      "label": "Kerr County",
      "fips": "48265"
    },
    {
      "label": "Kimble County",
      "fips": "48267"
    },
    {
      "label": "King County",
      "fips": "48269"
    },
    {
      "label": "Kinney County",
      "fips": "48271"
    },
    {
      "label": "Kleberg County",
      "fips": "48273"
    },
    {
      "label": "Knox County",
      "fips": "48275"
    },
    {
      "label": "Lamar County",
      "fips": "48277"
    },
    {
      "label": "Lamb County",
      "fips": "48279"
    },
    {
      "label": "Lampasas County",
      "fips": "48281"
    },
    {
      "label": "La Salle County",
      "fips": "48283"
    },
    {
      "label": "Lavaca County",
      "fips": "48285"
    },
    {
      "label": "Lee County",
      "fips": "48287"
    },
    {
      "label": "Leon County",
      "fips": "48289"
    },
    {
      "label": "Liberty County",
      "fips": "48291"
    },
    {
      "label": "Limestone County",
      "fips": "48293"
    },
    {
      "label": "Lipscomb County",
      "fips": "48295"
    },
    {
      "label": "Live Oak County",
      "fips": "48297"
    },
    {
      "label": "Llano County",
      "fips": "48299"
    },
    {
      "label": "Loving County",
      "fips": "48301"
    },
    {
      "label": "Lubbock County",
      "fips": "48303"
    },
    {
      "label": "Lynn County",
      "fips": "48305"
    },
    {
      "label": "McCulloch County",
      "fips": "48307"
    },
    {
      "label": "McLennan County",
      "fips": "48309"
    },
    {
      "label": "McMullen County",
      "fips": "48311"
    },
    {
      "label": "Madison County",
      "fips": "48313"
    },
    {
      "label": "Marion County",
      "fips": "48315"
    },
    {
      "label": "Martin County",
      "fips": "48317"
    },
    {
      "label": "Mason County",
      "fips": "48319"
    },
    {
      "label": "Matagorda County",
      "fips": "48321"
    },
    {
      "label": "Maverick County",
      "fips": "48323"
    },
    {
      "label": "Medina County",
      "fips": "48325"
    },
    {
      "label": "Menard County",
      "fips": "48327"
    },
    {
      "label": "Midland County",
      "fips": "48329"
    },
    {
      "label": "Milam County",
      "fips": "48331"
    },
    {
      "label": "Mills County",
      "fips": "48333"
    },
    {
      "label": "Mitchell County",
      "fips": "48335"
    },
    {
      "label": "Montague County",
      "fips": "48337"
    },
    {
      "label": "Montgomery County",
      "fips": "48339"
    },
    {
      "label": "Moore County",
      "fips": "48341"
    },
    {
      "label": "Morris County",
      "fips": "48343"
    },
    {
      "label": "Motley County",
      "fips": "48345"
    },
    {
      "label": "Nacogdoches County",
      "fips": "48347"
    },
    {
      "label": "Navarro County",
      "fips": "48349"
    },
    {
      "label": "Newton County",
      "fips": "48351"
    },
    {
      "label": "Nolan County",
      "fips": "48353"
    },
    {
      "label": "Nueces County",
      "fips": "48355"
    },
    {
      "label": "Ochiltree County",
      "fips": "48357"
    },
    {
      "label": "Oldham County",
      "fips": "48359"
    },
    {
      "label": "Orange County",
      "fips": "48361"
    },
    {
      "label": "Palo Pinto County",
      "fips": "48363"
    },
    {
      "label": "Panola County",
      "fips": "48365"
    },
    {
      "label": "Parker County",
      "fips": "48367"
    },
    {
      "label": "Parmer County",
      "fips": "48369"
    },
    {
      "label": "Pecos County",
      "fips": "48371"
    },
    {
      "label": "Polk County",
      "fips": "48373"
    },
    {
      "label": "Potter County",
      "fips": "48375"
    },
    {
      "label": "Presidio County",
      "fips": "48377"
    },
    {
      "label": "Rains County",
      "fips": "48379"
    },
    {
      "label": "Randall County",
      "fips": "48381"
    },
    {
      "label": "Reagan County",
      "fips": "48383"
    },
    {
      "label": "Real County",
      "fips": "48385"
    },
    {
      "label": "Red River County",
      "fips": "48387"
    },
    {
      "label": "Reeves County",
      "fips": "48389"
    },
    {
      "label": "Refugio County",
      "fips": "48391"
    },
    {
      "label": "Roberts County",
      "fips": "48393"
    },
    {
      "label": "Robertson County",
      "fips": "48395"
    },
    {
      "label": "Rockwall County",
      "fips": "48397"
    },
    {
      "label": "Runnels County",
      "fips": "48399"
    },
    {
      "label": "Rusk County",
      "fips": "48401"
    },
    {
      "label": "Sabine County",
      "fips": "48403"
    },
    {
      "label": "San Augustine County",
      "fips": "48405"
    },
    {
      "label": "San Jacinto County",
      "fips": "48407"
    },
    {
      "label": "San Patricio County",
      "fips": "48409"
    },
    {
      "label": "San Saba County",
      "fips": "48411"
    },
    {
      "label": "Schleicher County",
      "fips": "48413"
    },
    {
      "label": "Scurry County",
      "fips": "48415"
    },
    {
      "label": "Shackelford County",
      "fips": "48417"
    },
    {
      "label": "Shelby County",
      "fips": "48419"
    },
    {
      "label": "Sherman County",
      "fips": "48421"
    },
    {
      "label": "Smith County",
      "fips": "48423"
    },
    {
      "label": "Somervell County",
      "fips": "48425"
    },
    {
      "label": "Starr County",
      "fips": "48427"
    },
    {
      "label": "Stephens County",
      "fips": "48429"
    },
    {
      "label": "Sterling County",
      "fips": "48431"
    },
    {
      "label": "Stonewall County",
      "fips": "48433"
    },
    {
      "label": "Sutton County",
      "fips": "48435"
    },
    {
      "label": "Swisher County",
      "fips": "48437"
    },
    {
      "label": "Tarrant County",
      "fips": "48439"
    },
    {
      "label": "Taylor County",
      "fips": "48441"
    },
    {
      "label": "Terrell County",
      "fips": "48443"
    },
    {
      "label": "Terry County",
      "fips": "48445"
    },
    {
      "label": "Throckmorton County",
      "fips": "48447"
    },
    {
      "label": "Titus County",
      "fips": "48449"
    },
    {
      "label": "Tom Green County",
      "fips": "48451"
    },
    {
      "label": "Travis County",
      "fips": "48453"
    },
    {
      "label": "Trinity County",
      "fips": "48455"
    },
    {
      "label": "Tyler County",
      "fips": "48457"
    },
    {
      "label": "Upshur County",
      "fips": "48459"
    },
    {
      "label": "Upton County",
      "fips": "48461"
    },
    {
      "label": "Uvalde County",
      "fips": "48463"
    },
    {
      "label": "Val Verde County",
      "fips": "48465"
    },
    {
      "label": "Van Zandt County",
      "fips": "48467"
    },
    {
      "label": "Victoria County",
      "fips": "48469"
    },
    {
      "label": "Walker County",
      "fips": "48471"
    },
    {
      "label": "Waller County",
      "fips": "48473"
    },
    {
      "label": "Ward County",
      "fips": "48475"
    },
    {
      "label": "Washington County",
      "fips": "48477"
    },
    {
      "label": "Webb County",
      "fips": "48479"
    },
    {
      "label": "Wharton County",
      "fips": "48481"
    },
    {
      "label": "Wheeler County",
      "fips": "48483"
    },
    {
      "label": "Wichita County",
      "fips": "48485"
    },
    {
      "label": "Wilbarger County",
      "fips": "48487"
    },
    {
      "label": "Willacy County",
      "fips": "48489"
    },
    {
      "label": "Williamson County",
      "fips": "48491"
    },
    {
      "label": "Wilson County",
      "fips": "48493"
    },
    {
      "label": "Winkler County",
      "fips": "48495"
    },
    {
      "label": "Wise County",
      "fips": "48497"
    },
    {
      "label": "Wood County",
      "fips": "48499"
    },
    {
      "label": "Yoakum County",
      "fips": "48501"
    },
    {
      "label": "Young County",
      "fips": "48503"
    },
    {
      "label": "Zapata County",
      "fips": "48505"
    },
    {
      "label": "Zavala County",
      "fips": "48507"
    }
  ],
  "UT": [
    {
      "label": "Beaver County",
      "fips": "49001"
    },
    {
      "label": "Box Elder County",
      "fips": "49003"
    },
    {
      "label": "Cache County",
      "fips": "49005"
    },
    {
      "label": "Carbon County",
      "fips": "49007"
    },
    {
      "label": "Daggett County",
      "fips": "49009"
    },
    {
      "label": "Davis County",
      "fips": "49011"
    },
    {
      "label": "Duchesne County",
      "fips": "49013"
    },
    {
      "label": "Emery County",
      "fips": "49015"
    },
    {
      "label": "Garfield County",
      "fips": "49017"
    },
    {
      "label": "Grand County",
      "fips": "49019"
    },
    {
      "label": "Iron County",
      "fips": "49021"
    },
    {
      "label": "Juab County",
      "fips": "49023"
    },
    {
      "label": "Kane County",
      "fips": "49025"
    },
    {
      "label": "Millard County",
      "fips": "49027"
    },
    {
      "label": "Morgan County",
      "fips": "49029"
    },
    {
      "label": "Piute County",
      "fips": "49031"
    },
    {
      "label": "Rich County",
      "fips": "49033"
    },
    {
      "label": "Salt Lake County",
      "fips": "49035"
    },
    {
      "label": "San Juan County",
      "fips": "49037"
    },
    {
      "label": "Sanpete County",
      "fips": "49039"
    },
    {
      "label": "Sevier County",
      "fips": "49041"
    },
    {
      "label": "Summit County",
      "fips": "49043"
    },
    {
      "label": "Tooele County",
      "fips": "49045"
    },
    {
      "label": "Uintah County",
      "fips": "49047"
    },
    {
      "label": "Utah County",
      "fips": "49049"
    },
    {
      "label": "Wasatch County",
      "fips": "49051"
    },
    {
      "label": "Washington County",
      "fips": "49053"
    },
    {
      "label": "Wayne County",
      "fips": "49055"
    },
    {
      "label": "Weber County",
      "fips": "49057"
    }
  ],
  "VT": [
    {
      "label": "Addison County",
      "fips": "50001"
    },
    {
      "label": "Bennington County",
      "fips": "50003"
    },
    {
      "label": "Caledonia County",
      "fips": "50005"
    },
    {
      "label": "Chittenden County",
      "fips": "50007"
    },
    {
      "label": "Essex County",
      "fips": "50009"
    },
    {
      "label": "Franklin County",
      "fips": "50011"
    },
    {
      "label": "Grand Isle County",
      "fips": "50013"
    },
    {
      "label": "Lamoille County",
      "fips": "50015"
    },
    {
      "label": "Orange County",
      "fips": "50017"
    },
    {
      "label": "Orleans County",
      "fips": "50019"
    },
    {
      "label": "Rutland County",
      "fips": "50021"
    },
    {
      "label": "Washington County",
      "fips": "50023"
    },
    {
      "label": "Windham County",
      "fips": "50025"
    },
    {
      "label": "Windsor County",
      "fips": "50027"
    }
  ],
  "VA": [
    {
      "label": "Accomack County",
      "fips": "51001"
    },
    {
      "label": "Albemarle County",
      "fips": "51003"
    },
    {
      "label": "Alleghany County",
      "fips": "51005"
    },
    {
      "label": "Amelia County",
      "fips": "51007"
    },
    {
      "label": "Amherst County",
      "fips": "51009"
    },
    {
      "label": "Appomattox County",
      "fips": "51011"
    },
    {
      "label": "Arlington County",
      "fips": "51013"
    },
    {
      "label": "Augusta County",
      "fips": "51015"
    },
    {
      "label": "Bath County",
      "fips": "51017"
    },
    {
      "label": "Bedford County",
      "fips": "51019"
    },
    {
      "label": "Bland County",
      "fips": "51021"
    },
    {
      "label": "Botetourt County",
      "fips": "51023"
    },
    {
      "label": "Brunswick County",
      "fips": "51025"
    },
    {
      "label": "Buchanan County",
      "fips": "51027"
    },
    {
      "label": "Buckingham County",
      "fips": "51029"
    },
    {
      "label": "Campbell County",
      "fips": "51031"
    },
    {
      "label": "Caroline County",
      "fips": "51033"
    },
    {
      "label": "Carroll County",
      "fips": "51035"
    },
    {
      "label": "Charles City County",
      "fips": "51036"
    },
    {
      "label": "Charlotte County",
      "fips": "51037"
    },
    {
      "label": "Chesterfield County",
      "fips": "51041"
    },
    {
      "label": "Clarke County",
      "fips": "51043"
    },
    {
      "label": "Craig County",
      "fips": "51045"
    },
    {
      "label": "Culpeper County",
      "fips": "51047"
    },
    {
      "label": "Cumberland County",
      "fips": "51049"
    },
    {
      "label": "Dickenson County",
      "fips": "51051"
    },
    {
      "label": "Dinwiddie County",
      "fips": "51053"
    },
    {
      "label": "Essex County",
      "fips": "51057"
    },
    {
      "label": "Fairfax County",
      "fips": "51059"
    },
    {
      "label": "Fauquier County",
      "fips": "51061"
    },
    {
      "label": "Floyd County",
      "fips": "51063"
    },
    {
      "label": "Fluvanna County",
      "fips": "51065"
    },
    {
      "label": "Franklin County",
      "fips": "51067"
    },
    {
      "label": "Frederick County",
      "fips": "51069"
    },
    {
      "label": "Giles County",
      "fips": "51071"
    },
    {
      "label": "Gloucester County",
      "fips": "51073"
    },
    {
      "label": "Goochland County",
      "fips": "51075"
    },
    {
      "label": "Grayson County",
      "fips": "51077"
    },
    {
      "label": "Greene County",
      "fips": "51079"
    },
    {
      "label": "Greensville County",
      "fips": "51081"
    },
    {
      "label": "Halifax County",
      "fips": "51083"
    },
    {
      "label": "Hanover County",
      "fips": "51085"
    },
    {
      "label": "Henrico County",
      "fips": "51087"
    },
    {
      "label": "Henry County",
      "fips": "51089"
    },
    {
      "label": "Highland County",
      "fips": "51091"
    },
    {
      "label": "Isle of Wight County",
      "fips": "51093"
    },
    {
      "label": "James City County",
      "fips": "51095"
    },
    {
      "label": "King and Queen County",
      "fips": "51097"
    },
    {
      "label": "King George County",
      "fips": "51099"
    },
    {
      "label": "King William County",
      "fips": "51101"
    },
    {
      "label": "Lancaster County",
      "fips": "51103"
    },
    {
      "label": "Lee County",
      "fips": "51105"
    },
    {
      "label": "Loudoun County",
      "fips": "51107"
    },
    {
      "label": "Louisa County",
      "fips": "51109"
    },
    {
      "label": "Lunenburg County",
      "fips": "51111"
    },
    {
      "label": "Madison County",
      "fips": "51113"
    },
    {
      "label": "Mathews County",
      "fips": "51115"
    },
    {
      "label": "Mecklenburg County",
      "fips": "51117"
    },
    {
      "label": "Middlesex County",
      "fips": "51119"
    },
    {
      "label": "Montgomery County",
      "fips": "51121"
    },
    {
      "label": "Nelson County",
      "fips": "51125"
    },
    {
      "label": "New Kent County",
      "fips": "51127"
    },
    {
      "label": "Northampton County",
      "fips": "51131"
    },
    {
      "label": "Northumberland County",
      "fips": "51133"
    },
    {
      "label": "Nottoway County",
      "fips": "51135"
    },
    {
      "label": "Orange County",
      "fips": "51137"
    },
    {
      "label": "Page County",
      "fips": "51139"
    },
    {
      "label": "Patrick County",
      "fips": "51141"
    },
    {
      "label": "Pittsylvania County",
      "fips": "51143"
    },
    {
      "label": "Powhatan County",
      "fips": "51145"
    },
    {
      "label": "Prince Edward County",
      "fips": "51147"
    },
    {
      "label": "Prince George County",
      "fips": "51149"
    },
    {
      "label": "Prince William County",
      "fips": "51153"
    },
    {
      "label": "Pulaski County",
      "fips": "51155"
    },
    {
      "label": "Rappahannock County",
      "fips": "51157"
    },
    {
      "label": "Richmond County",
      "fips": "51159"
    },
    {
      "label": "Roanoke County",
      "fips": "51161"
    },
    {
      "label": "Rockbridge County",
      "fips": "51163"
    },
    {
      "label": "Rockingham County",
      "fips": "51165"
    },
    {
      "label": "Russell County",
      "fips": "51167"
    },
    {
      "label": "Scott County",
      "fips": "51169"
    },
    {
      "label": "Shenandoah County",
      "fips": "51171"
    },
    {
      "label": "Smyth County",
      "fips": "51173"
    },
    {
      "label": "Southampton County",
      "fips": "51175"
    },
    {
      "label": "Spotsylvania County",
      "fips": "51177"
    },
    {
      "label": "Stafford County",
      "fips": "51179"
    },
    {
      "label": "Surry County",
      "fips": "51181"
    },
    {
      "label": "Sussex County",
      "fips": "51183"
    },
    {
      "label": "Tazewell County",
      "fips": "51185"
    },
    {
      "label": "Warren County",
      "fips": "51187"
    },
    {
      "label": "Washington County",
      "fips": "51191"
    },
    {
      "label": "Westmoreland County",
      "fips": "51193"
    },
    {
      "label": "Wise County",
      "fips": "51195"
    },
    {
      "label": "Wythe County",
      "fips": "51197"
    },
    {
      "label": "York County",
      "fips": "51199"
    },
    {
      "label": "Alexandria city",
      "fips": "51510"
    },
    {
      "label": "Bedford city",
      "fips": "51515"
    },
    {
      "label": "Bristol city",
      "fips": "51520"
    },
    {
      "label": "Buena Vista city",
      "fips": "51530"
    },
    {
      "label": "Charlottesville city",
      "fips": "51540"
    },
    {
      "label": "Chesapeake city",
      "fips": "51550"
    },
    {
      "label": "Colonial Heights city",
      "fips": "51570"
    },
    {
      "label": "Covington city",
      "fips": "51580"
    },
    {
      "label": "Danville city",
      "fips": "51590"
    },
    {
      "label": "Emporia city",
      "fips": "51595"
    },
    {
      "label": "Fairfax city",
      "fips": "51600"
    },
    {
      "label": "Falls Church city",
      "fips": "51610"
    },
    {
      "label": "Franklin city",
      "fips": "51620"
    },
    {
      "label": "Fredericksburg city",
      "fips": "51630"
    },
    {
      "label": "Galax city",
      "fips": "51640"
    },
    {
      "label": "Hampton city",
      "fips": "51650"
    },
    {
      "label": "Harrisonburg city",
      "fips": "51660"
    },
    {
      "label": "Hopewell city",
      "fips": "51670"
    },
    {
      "label": "Lexington city",
      "fips": "51678"
    },
    {
      "label": "Lynchburg city",
      "fips": "51680"
    },
    {
      "label": "Manassas city",
      "fips": "51683"
    },
    {
      "label": "Manassas Park city",
      "fips": "51685"
    },
    {
      "label": "Martinsville city",
      "fips": "51690"
    },
    {
      "label": "Newport News city",
      "fips": "51700"
    },
    {
      "label": "Norfolk city",
      "fips": "51710"
    },
    {
      "label": "Norton city",
      "fips": "51720"
    },
    {
      "label": "Petersburg city",
      "fips": "51730"
    },
    {
      "label": "Poquoson city",
      "fips": "51735"
    },
    {
      "label": "Portsmouth city",
      "fips": "51740"
    },
    {
      "label": "Radford city",
      "fips": "51750"
    },
    {
      "label": "Richmond city",
      "fips": "51760"
    },
    {
      "label": "Roanoke city",
      "fips": "51770"
    },
    {
      "label": "Salem city",
      "fips": "51775"
    },
    {
      "label": "Staunton city",
      "fips": "51790"
    },
    {
      "label": "Suffolk city",
      "fips": "51800"
    },
    {
      "label": "Virginia Beach city",
      "fips": "51810"
    },
    {
      "label": "Waynesboro city",
      "fips": "51820"
    },
    {
      "label": "Williamsburg city",
      "fips": "51830"
    },
    {
      "label": "Winchester city",
      "fips": "51840"
    }
  ],
  "WA": [
    {
      "label": "Adams County",
      "fips": "53001"
    },
    {
      "label": "Asotin County",
      "fips": "53003"
    },
    {
      "label": "Benton County",
      "fips": "53005"
    },
    {
      "label": "Chelan County",
      "fips": "53007"
    },
    {
      "label": "Clallam County",
      "fips": "53009"
    },
    {
      "label": "Clark County",
      "fips": "53011"
    },
    {
      "label": "Columbia County",
      "fips": "53013"
    },
    {
      "label": "Cowlitz County",
      "fips": "53015"
    },
    {
      "label": "Douglas County",
      "fips": "53017"
    },
    {
      "label": "Ferry County",
      "fips": "53019"
    },
    {
      "label": "Franklin County",
      "fips": "53021"
    },
    {
      "label": "Garfield County",
      "fips": "53023"
    },
    {
      "label": "Grant County",
      "fips": "53025"
    },
    {
      "label": "Grays Harbor County",
      "fips": "53027"
    },
    {
      "label": "Island County",
      "fips": "53029"
    },
    {
      "label": "Jefferson County",
      "fips": "53031"
    },
    {
      "label": "King County",
      "fips": "53033"
    },
    {
      "label": "Kitsap County",
      "fips": "53035"
    },
    {
      "label": "Kittitas County",
      "fips": "53037"
    },
    {
      "label": "Klickitat County",
      "fips": "53039"
    },
    {
      "label": "Lewis County",
      "fips": "53041"
    },
    {
      "label": "Lincoln County",
      "fips": "53043"
    },
    {
      "label": "Mason County",
      "fips": "53045"
    },
    {
      "label": "Okanogan County",
      "fips": "53047"
    },
    {
      "label": "Pacific County",
      "fips": "53049"
    },
    {
      "label": "Pend Oreille County",
      "fips": "53051"
    },
    {
      "label": "Pierce County",
      "fips": "53053"
    },
    {
      "label": "San Juan County",
      "fips": "53055"
    },
    {
      "label": "Skagit County",
      "fips": "53057"
    },
    {
      "label": "Skamania County",
      "fips": "53059"
    },
    {
      "label": "Snohomish County",
      "fips": "53061"
    },
    {
      "label": "Spokane County",
      "fips": "53063"
    },
    {
      "label": "Stevens County",
      "fips": "53065"
    },
    {
      "label": "Thurston County",
      "fips": "53067"
    },
    {
      "label": "Wahkiakum County",
      "fips": "53069"
    },
    {
      "label": "Walla Walla County",
      "fips": "53071"
    },
    {
      "label": "Whatcom County",
      "fips": "53073"
    },
    {
      "label": "Whitman County",
      "fips": "53075"
    },
    {
      "label": "Yakima County",
      "fips": "53077"
    }
  ],
  "WV": [
    {
      "label": "Barbour County",
      "fips": "54001"
    },
    {
      "label": "Berkeley County",
      "fips": "54003"
    },
    {
      "label": "Boone County",
      "fips": "54005"
    },
    {
      "label": "Braxton County",
      "fips": "54007"
    },
    {
      "label": "Brooke County",
      "fips": "54009"
    },
    {
      "label": "Cabell County",
      "fips": "54011"
    },
    {
      "label": "Calhoun County",
      "fips": "54013"
    },
    {
      "label": "Clay County",
      "fips": "54015"
    },
    {
      "label": "Doddridge County",
      "fips": "54017"
    },
    {
      "label": "Fayette County",
      "fips": "54019"
    },
    {
      "label": "Gilmer County",
      "fips": "54021"
    },
    {
      "label": "Grant County",
      "fips": "54023"
    },
    {
      "label": "Greenbrier County",
      "fips": "54025"
    },
    {
      "label": "Hampshire County",
      "fips": "54027"
    },
    {
      "label": "Hancock County",
      "fips": "54029"
    },
    {
      "label": "Hardy County",
      "fips": "54031"
    },
    {
      "label": "Harrison County",
      "fips": "54033"
    },
    {
      "label": "Jackson County",
      "fips": "54035"
    },
    {
      "label": "Jefferson County",
      "fips": "54037"
    },
    {
      "label": "Kanawha County",
      "fips": "54039"
    },
    {
      "label": "Lewis County",
      "fips": "54041"
    },
    {
      "label": "Lincoln County",
      "fips": "54043"
    },
    {
      "label": "Logan County",
      "fips": "54045"
    },
    {
      "label": "McDowell County",
      "fips": "54047"
    },
    {
      "label": "Marion County",
      "fips": "54049"
    },
    {
      "label": "Marshall County",
      "fips": "54051"
    },
    {
      "label": "Mason County",
      "fips": "54053"
    },
    {
      "label": "Mercer County",
      "fips": "54055"
    },
    {
      "label": "Mineral County",
      "fips": "54057"
    },
    {
      "label": "Mingo County",
      "fips": "54059"
    },
    {
      "label": "Monongalia County",
      "fips": "54061"
    },
    {
      "label": "Monroe County",
      "fips": "54063"
    },
    {
      "label": "Morgan County",
      "fips": "54065"
    },
    {
      "label": "Nicholas County",
      "fips": "54067"
    },
    {
      "label": "Ohio County",
      "fips": "54069"
    },
    {
      "label": "Pendleton County",
      "fips": "54071"
    },
    {
      "label": "Pleasants County",
      "fips": "54073"
    },
    {
      "label": "Pocahontas County",
      "fips": "54075"
    },
    {
      "label": "Preston County",
      "fips": "54077"
    },
    {
      "label": "Putnam County",
      "fips": "54079"
    },
    {
      "label": "Raleigh County",
      "fips": "54081"
    },
    {
      "label": "Randolph County",
      "fips": "54083"
    },
    {
      "label": "Ritchie County",
      "fips": "54085"
    },
    {
      "label": "Roane County",
      "fips": "54087"
    },
    {
      "label": "Summers County",
      "fips": "54089"
    },
    {
      "label": "Taylor County",
      "fips": "54091"
    },
    {
      "label": "Tucker County",
      "fips": "54093"
    },
    {
      "label": "Tyler County",
      "fips": "54095"
    },
    {
      "label": "Upshur County",
      "fips": "54097"
    },
    {
      "label": "Wayne County",
      "fips": "54099"
    },
    {
      "label": "Webster County",
      "fips": "54101"
    },
    {
      "label": "Wetzel County",
      "fips": "54103"
    },
    {
      "label": "Wirt County",
      "fips": "54105"
    },
    {
      "label": "Wood County",
      "fips": "54107"
    },
    {
      "label": "Wyoming County",
      "fips": "54109"
    }
  ],
  "WI": [
    {
      "label": "Adams County",
      "fips": "55001"
    },
    {
      "label": "Ashland County",
      "fips": "55003"
    },
    {
      "label": "Barron County",
      "fips": "55005"
    },
    {
      "label": "Bayfield County",
      "fips": "55007"
    },
    {
      "label": "Brown County",
      "fips": "55009"
    },
    {
      "label": "Buffalo County",
      "fips": "55011"
    },
    {
      "label": "Burnett County",
      "fips": "55013"
    },
    {
      "label": "Calumet County",
      "fips": "55015"
    },
    {
      "label": "Chippewa County",
      "fips": "55017"
    },
    {
      "label": "Clark County",
      "fips": "55019"
    },
    {
      "label": "Columbia County",
      "fips": "55021"
    },
    {
      "label": "Crawford County",
      "fips": "55023"
    },
    {
      "label": "Dane County",
      "fips": "55025"
    },
    {
      "label": "Dodge County",
      "fips": "55027"
    },
    {
      "label": "Door County",
      "fips": "55029"
    },
    {
      "label": "Douglas County",
      "fips": "55031"
    },
    {
      "label": "Dunn County",
      "fips": "55033"
    },
    {
      "label": "Eau Claire County",
      "fips": "55035"
    },
    {
      "label": "Florence County",
      "fips": "55037"
    },
    {
      "label": "Fond du Lac County",
      "fips": "55039"
    },
    {
      "label": "Forest County",
      "fips": "55041"
    },
    {
      "label": "Grant County",
      "fips": "55043"
    },
    {
      "label": "Green County",
      "fips": "55045"
    },
    {
      "label": "Green Lake County",
      "fips": "55047"
    },
    {
      "label": "Iowa County",
      "fips": "55049"
    },
    {
      "label": "Iron County",
      "fips": "55051"
    },
    {
      "label": "Jackson County",
      "fips": "55053"
    },
    {
      "label": "Jefferson County",
      "fips": "55055"
    },
    {
      "label": "Juneau County",
      "fips": "55057"
    },
    {
      "label": "Kenosha County",
      "fips": "55059"
    },
    {
      "label": "Kewaunee County",
      "fips": "55061"
    },
    {
      "label": "La Crosse County",
      "fips": "55063"
    },
    {
      "label": "Lafayette County",
      "fips": "55065"
    },
    {
      "label": "Langlade County",
      "fips": "55067"
    },
    {
      "label": "Lincoln County",
      "fips": "55069"
    },
    {
      "label": "Manitowoc County",
      "fips": "55071"
    },
    {
      "label": "Marathon County",
      "fips": "55073"
    },
    {
      "label": "Marinette County",
      "fips": "55075"
    },
    {
      "label": "Marquette County",
      "fips": "55077"
    },
    {
      "label": "Menominee County",
      "fips": "55078"
    },
    {
      "label": "Milwaukee County",
      "fips": "55079"
    },
    {
      "label": "Monroe County",
      "fips": "55081"
    },
    {
      "label": "Oconto County",
      "fips": "55083"
    },
    {
      "label": "Oneida County",
      "fips": "55085"
    },
    {
      "label": "Outagamie County",
      "fips": "55087"
    },
    {
      "label": "Ozaukee County",
      "fips": "55089"
    },
    {
      "label": "Pepin County",
      "fips": "55091"
    },
    {
      "label": "Pierce County",
      "fips": "55093"
    },
    {
      "label": "Polk County",
      "fips": "55095"
    },
    {
      "label": "Portage County",
      "fips": "55097"
    },
    {
      "label": "Price County",
      "fips": "55099"
    },
    {
      "label": "Racine County",
      "fips": "55101"
    },
    {
      "label": "Richland County",
      "fips": "55103"
    },
    {
      "label": "Rock County",
      "fips": "55105"
    },
    {
      "label": "Rusk County",
      "fips": "55107"
    },
    {
      "label": "St. Croix County",
      "fips": "55109"
    },
    {
      "label": "Sauk County",
      "fips": "55111"
    },
    {
      "label": "Sawyer County",
      "fips": "55113"
    },
    {
      "label": "Shawano County",
      "fips": "55115"
    },
    {
      "label": "Sheboygan County",
      "fips": "55117"
    },
    {
      "label": "Taylor County",
      "fips": "55119"
    },
    {
      "label": "Trempealeau County",
      "fips": "55121"
    },
    {
      "label": "Vernon County",
      "fips": "55123"
    },
    {
      "label": "Vilas County",
      "fips": "55125"
    },
    {
      "label": "Walworth County",
      "fips": "55127"
    },
    {
      "label": "Washburn County",
      "fips": "55129"
    },
    {
      "label": "Washington County",
      "fips": "55131"
    },
    {
      "label": "Waukesha County",
      "fips": "55133"
    },
    {
      "label": "Waupaca County",
      "fips": "55135"
    },
    {
      "label": "Waushara County",
      "fips": "55137"
    },
    {
      "label": "Winnebago County",
      "fips": "55139"
    },
    {
      "label": "Wood County",
      "fips": "55141"
    }
  ],
  "WY": [
    {
      "label": "Albany County",
      "fips": "56001"
    },
    {
      "label": "Big Horn County",
      "fips": "56003"
    },
    {
      "label": "Campbell County",
      "fips": "56005"
    },
    {
      "label": "Carbon County",
      "fips": "56007"
    },
    {
      "label": "Converse County",
      "fips": "56009"
    },
    {
      "label": "Crook County",
      "fips": "56011"
    },
    {
      "label": "Fremont County",
      "fips": "56013"
    },
    {
      "label": "Goshen County",
      "fips": "56015"
    },
    {
      "label": "Hot Springs County",
      "fips": "56017"
    },
    {
      "label": "Johnson County",
      "fips": "56019"
    },
    {
      "label": "Laramie County",
      "fips": "56021"
    },
    {
      "label": "Lincoln County",
      "fips": "56023"
    },
    {
      "label": "Natrona County",
      "fips": "56025"
    },
    {
      "label": "Niobrara County",
      "fips": "56027"
    },
    {
      "label": "Park County",
      "fips": "56029"
    },
    {
      "label": "Platte County",
      "fips": "56031"
    },
    {
      "label": "Sheridan County",
      "fips": "56033"
    },
    {
      "label": "Sublette County",
      "fips": "56035"
    },
    {
      "label": "Sweetwater County",
      "fips": "56037"
    },
    {
      "label": "Teton County",
      "fips": "56039"
    },
    {
      "label": "Uinta County",
      "fips": "56041"
    },
    {
      "label": "Washakie County",
      "fips": "56043"
    },
    {
      "label": "Weston County",
      "fips": "56045"
    }
  ]
};
