import { Component, OnInit } from '@angular/core';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
@Component({
  selector: 'app-auditlog-report',
  templateUrl: './auditlog-report.component.html',
  styleUrls: ['./auditlog-report.component.css']
})
export class AuditlogReportComponent implements OnInit {
  SearchValue:any;
  constructor() { }

  resetSearch() {
    this.SearchValue = '';
    $('.dataTables_scrollBody').mCustomScrollbar('destroy');
    this.ngOnInit();
    }

  ngOnInit(): void {
    myMethod();
    selectSearchMethod();
    $(".search-input .icon-search").click(function () {
      $(this).parent(".search-input").addClass("active");
    });
    $(".search-input .closesearch").click(function () {
      $(this).parent(".search-input").removeClass("active");
    });
    $(".tablesearch-content").mCustomScrollbar({
      axis: "y",
      theme: "dark",
      scrollbarPosition: "inside",
      advanced: {
        updateOnContentResize: true
      }
    });
    setTimeout(() => {
      function changeRichScrollbar(parentSelector, tableSelector) {
        
        $(tableSelector + ' thead tr th').each(function(index, v) {
          // var style = $(v).attr('style');
          // $(v).css({
          //   cssText: style + "; height: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important;"
          // });
        });
        
        
        if ($(window).width() > 768) {
        $(parentSelector + ' .dataTables_scrollBody').mCustomScrollbar({
          axis: "x",
          scrollInertia: 0,
          theme: "dark",
          callbacks: {
            whileScrolling: function() {
              $(parentSelector + " .dataTables_scrollHead").scrollLeft(this.mcs.left * -1);
            },            
          },
        });
      } else {
        $('.dataTables_scrollBody').mCustomScrollbar('destroy');
      }
      $(window).resize(function () {
        if ($(window).width() > 768) {
          $(parentSelector + ' .dataTables_scrollBody').mCustomScrollbar({
            axis: "x",
            scrollInertia: 0,
            theme: "dark",
            callbacks: {
              whileScrolling: function() {
                $(parentSelector + " .dataTables_scrollHead").scrollLeft(this.mcs.left * -1);
              },             
            },
          });
        } else {
          $('.dataTables_scrollBody').mCustomScrollbar('destroy');
        }
      })
        $(parentSelector + ' .dataTables_scrollBody').css("border-bottom", "none");
      }

      
      
      var tableParentSelector = ".parentId";
      var tableSelector = ".datatable";
      var table = $(tableSelector).DataTable({
        sScrollX: "100%"
         
      });
      
      // new $.fn.dataTable.FixedColumns(table);
      changeRichScrollbar(tableParentSelector, tableSelector);
    }, 100);
    $(".user-arrow").on('click', function () {
      var thposition = $(this).parent("th").offset();
      var cthposition =  thposition.left + 30;
      var thdatavalue = $(this).parent("th").attr("data-val");      
      $(".userarrow-section_"+thdatavalue).css({        
        "left":cthposition
      });
      var thiselement = $(this);
      if ($(this).hasClass('filter-open')) {       
        $(".userarrow-section_"+thdatavalue+" .table-checkfilter").addClass("active");       
        setTimeout(function () {
          thiselement.removeClass('filter-open');
          thiselement.addClass('filter-close');
        }, 500);
      }
      if ($(this).hasClass('filter-close')) {
        $(".userarrow-section_"+thdatavalue+" .table-checkfilter").removeClass("active");
        setTimeout(function () {
          thiselement.removeClass('filter-close');
          thiselement.addClass('filter-open');
        }, 500);
      }
      $('.tablesearch-content').mCustomScrollbar('update');
      return false;
    });
  }

}
