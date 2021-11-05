JPL/PCK

  Mass parameters for planets & satellites used in Horizons

  Notes: 

    1) Parameter "BODY000_GMLIST" contains the list of all objects 
        with a defined GM, in ascending SPK ID code order. 

    2) Masses USED FOR DYNAMICS in Horizons asteroid/comet numerical 
       integrations (as perturbers) are ...

         1-2,4-10, 301, 399
         2000001, 2000002, 2000003, 2000004, 2000010, 2000015, 
         2000016, 2000031, 2000048, 2000052, 2000065, 2000087,
         2000088, 2000451, 2000511, 2000704

        ... where 1-9 are planetary system barycenters, 10 is the Sun,
            301 is the Moon, 399 is the Earth, and 2xxxxxx are selected
            large asteroid perturbers

    3) Any other masses shown (including asteroid Eros, 2000433) are used only  
        when computing osculating elements for targets involved with them

    4) Horizons uses only the product GM, not G by itself.

  Sources: 
  
      DE-441 "ASTRO-VALUES", Park                 [1-10,199,299,301,399] 
      Jacobson satellite file release forms [non-lunar satellites, planets]
      SB441-N16 small-body integration perturber file (DE411 masses)

  Units: km^3/s^2

  Modification history:

   DATE         Who  Change
   -----------  ---  -------------------------------------------------------
   2000-Nov-28  JDG  Version 1.0
   2002-Oct-17  JDG  C-P-V values made current
   2003-Feb-26  JDG  Pluto/Charon values consistent w/Jacobson PLU006
   2003-Mar-13  JDG  Update all satellite/planet GMs
   2005-Mar-02  JDG  Update Saturnians 601-609,699 to SAT192 values
   2005-Mar-07  JDG  Update Pluto system (901,999) to PLU009 values
   2005-Mar-18  JDG  Update 610-611, add 615-617 (SAT196)
   2006-Apr-28  JDG  Update 601-609, 699 (SAT242) and 401-402, 499 (MAR063)
   2006-Sep-28  JDG  Update 601-609, 699 (SAT252)
   2008-Aug-11  JDG  Revert to DE405 for Pluto system GM (9)
   2008-Sep-05  JDG  Over-ride DE405 "4" with 499+401+402
   2008-Sep-25  JDG  Update 4,499,401,402 for MAR080
   2013-Jul-23  JDG  Version 2.0
                      Updated planets to DE431 values (from DE405)
                      401-402,499    : MAR097
                      501-505,599    : JUP230
                      601-609,699    : SAT359
                      610-611,615-617: SAT357
                      701-705,799    : URA083 
                      801,899        : NEP081
                      901-904,999    : PLU042 (902-904 newly added)
                      2000001-2000004: BIG16 (smb perturber file value)
                      2000006-2000007: BIG16
                      2000010        : BIG16
                      2000015-2000016: BIG16
                      2000029        : BIG16
                      2000052        : BIG16
                      2000065        : BIG16
                      2000087-2000088: BIG16
                      2000433        : Yeomans et al. 
                                       (2000) Science v.289,pp.2085-2088
                      2000511        : BIG16
                      2000704        : BIG16
   2013-Dec-30  JDG  Updated for SAT360, PLU043
   2014-Jan-08  JDG  Updated for URA111/112
   2015-Nov-05  JDG  Updated for PLU055 (901-904, 905 added, 999)
   2016-Apr-05  JDG  Updated for SAT382 (610-611,615-617,699: 2015 update)
   2016-Jun-17  JDG  Updated for SAT389.14 (601-609,612 added, 699)
                     Updated for JUP310 (501-505, 599)
   2016-Sep-13  JDG  Updated for JUP340 (506 added, 599)
   2016-Oct-11  JDG  Updated for SAT393
   2017-May-09  JDG  Version 3.0 (Horizons 4.05)
                      Updated to DE431/N16 perturber model
                       Removed:  2000006, 2000007, 2000029
                       Added  :  2000031, 2000048, 2000451
                       Masses updated for consistency with DE430/431: 
                        2000001: DE431/N16 
                        2000002: DE431/N16 
                        2000003: DE431/N16 
                        2000004: DE431/N16 
                        2000010: DE431/N16 
                        2000015: DE431/N16 
                        2000016: DE431/N16 
                        2000052: DE431/N16 
                        2000065: DE431/N16 
                        2000087: DE431/N16 
                        2000088: DE431/N16 
                        2000511: DE431/N16
                        2000704: DE431/N16
   2017-Sep-29  JDG  Updated for JUP341  (506,599)
   2018-Oct-07  JDG  Updated for SAT409l (601-609,612,699)
   2019-Aug-08  JDG  Updated for SAT425l (601-609, 612-614, 632, 634, 699)
   2020-Jan-23  JDG  Updated for SAT427l (601-609, 612-614, 632, 634, 699)
   2020-Aug-07  JDG  Updated for NEP095  (801,899)
   2020-Sep-11  JDG  Updated for JUP357  (501-505, 599; 514-516 newly added)
   2020-Oct-01  JDG  Updated for NEP096  (801,899; 803-808 newly added)
   2021-Mar-07  JDG  Updated for JUP344  (506 GM)
   2021-Mar-12  JDG  Updated for JUP365  (501-505, 514-516, 599)
   2021-Apr-12  JDG  Version 4.0 (Horizons 4.80) 
                      Updated DE441 & N16 perturber model (from DE431)
                        Removed: 2000048, 2000451
                        Added  : 2000007, 2000107
   2021-Jun-07  JDG  Updated for PLU058 (901-905, 999)
   2021-Sep-30  JDG  Updated for URA116 (799)

  Key:
   JDG= Jon.D.Giorgini@jpl.nasa.gov

   \begindata

     BODY000_GMLIST= ( 1 2 3 4 5 6 7 8 9 10
                     199 299 
                     301 399 
                     401 402 499 
                     501 502 503 504 505 506 514 515 516 599
                     601 602 603 604 605 606 607 608 609 610 611 612 615 616 699
                     701 702 703 704 705 799
                     801 803 804 805 806 807 808 899
                     901 902 903 904 905 999
                     2000001 2000002 2000003 2000004 2000007 2000010 2000015 2000016
                     2000031 2000052 2000065 2000087 2000088 2000107 2000433
                     2000511 2000704 )

     BODY1_GM       = ( 2.2031868551400003D+04 )
     BODY2_GM       = ( 3.2485859200000000D+05 )
     BODY3_GM       = ( 4.0350323562548019D+05 )
     BODY4_GM       = ( 4.2828375815756102D+04 )
     BODY5_GM       = ( 1.2671276409999998D+08 )
     BODY6_GM       = ( 3.7940584841799997D+07 )
     BODY7_GM       = ( 5.7945563999999985D+06 )
     BODY8_GM       = ( 6.8365271005803989D+06 )
     BODY9_GM       = ( 9.7550000000000000D+02 )
     BODY10_GM      = ( 1.3271244004127942D+11 )

     BODY199_GM     = ( 2.2031868551400003D+04 )
     BODY299_GM     = ( 3.2485859200000000D+05 )
     BODY399_GM     = ( 3.9860043550702266D+05 )
     BODY499_GM     = ( 4.282837362069909E+04  )
     BODY599_GM     = ( 1.266865319003704E+08  )
     BODY699_GM     = ( 3.793120615901047E+07  )
     BODY799_GM     = ( 5.793951256527211E+06  )
     BODY899_GM     = ( 6.835099968446816E+06  )
     BODY999_GM     = ( 8.699633756209835E+02  )
 
     BODY301_GM     = ( 4.9028001184575496D+03 )

     BODY401_GM     = ( 7.087546066894452E-04 )
     BODY402_GM     = ( 9.615569648120313E-05 )

     BODY501_GM     = ( 5.959915466180539E+03 )
     BODY502_GM     = ( 3.202712099607295E+03 )
     BODY503_GM     = ( 9.887832752719638E+03 )
     BODY504_GM     = ( 7.179283402579837E+03 )
     BODY505_GM     = ( 1.645634534798259E-01 )
     BODY506_GM     = ( 1.515524299611265E-01 )
     BODY514_GM     = ( 3.014800000000000E-02 )
     BODY515_GM     = ( 1.390000000000000E-04 )
     BODY516_GM     = ( 2.501000000000000E-03 )
 
     BODY601_GM     = ( 2.503617062809250E+00 )
     BODY602_GM     = ( 7.210497553340731E+00 )
     BODY603_GM     = ( 4.121405263872402E+01 )
     BODY604_GM     = ( 7.311617801921636E+01 )
     BODY605_GM     = ( 1.539409077211430E+02 )
     BODY606_GM     = ( 8.978137369591670E+03 )
     BODY607_GM     = ( 3.704182596063880E-01 )
     BODY608_GM     = ( 1.205081845217891E+02 )
     BODY609_GM     = ( 5.581081743011904E-01 )
     BODY610_GM     = ( 1.265765099012197E-01 )
     BODY611_GM     = ( 3.512333288208074E-02 )
     BODY612_GM     = ( 4.551624250415933E-04 )
     BODY615_GM     = ( 3.718871247516475E-04 )
     BODY616_GM     = ( 1.075208001007610E-02 )
     BODY617_GM     = ( 9.290325122028795E-03 )

     BODY701_GM     = ( 8.346344431770477E+01 )
     BODY702_GM     = ( 8.509338094489388E+01 )
     BODY703_GM     = ( 2.269437003741248E+02 )
     BODY704_GM     = ( 2.053234302535623E+02 )
     BODY705_GM     = ( 4.319516899232100E+00 )

     BODY801_GM     = ( 1.428495462910464E+03 )
     BODY803_GM     = ( 8.530281246540886E-03 )
     BODY804_GM     = ( 2.358873197992170E-02 )
     BODY805_GM     = ( 1.167318403814998E-01 )
     BODY806_GM     = ( 1.898985039060690E-01 )
     BODY807_GM     = ( 2.548437405693583E-01 )
     BODY808_GM     = ( 2.583422379120727E+00 )
  
     BODY901_GM     = ( 1.061744232879427E+02 )
     BODY902_GM     = ( 1.800000000000000E-03 )
     BODY903_GM     = ( 2.249146225742025E-03 )
     BODY904_GM     = ( 9.000000000000001E-05 )
     BODY905_GM     = ( 2.000000000000000E-06 )

     BODY2000001_GM = ( 6.2628888644409933D+01 )
     BODY2000002_GM = ( 1.3665878145967422D+01 )
     BODY2000003_GM = ( 1.9205707002025889D+00 )
     BODY2000004_GM = ( 1.7288232879171513D+01 )
     BODY2000007_GM = ( 1.1398723232184107D+00 )
     BODY2000010_GM = ( 5.6251476453852289D+00 )
     BODY2000015_GM = ( 2.0230209871098284D+00 )
     BODY2000016_GM = ( 1.5896582441709424D+00 )
     BODY2000031_GM = ( 1.0793714577033560D+00 )
     BODY2000052_GM = ( 2.6830359242821795D+00 )
     BODY2000065_GM = ( 9.3810575639151328D-01 )
     BODY2000087_GM = ( 2.1682320736996910D+00 )
     BODY2000088_GM = ( 1.1898077088121908D+00 )
     BODY2000107_GM = ( 1.4437384031866001D+00 )
     BODY2000433_GM = ( 4.463E-4 )
     BODY2000511_GM = ( 3.8944831481705644D+00 )
     BODY2000704_GM = ( 2.8304096393299849D+00 )

   \begintext
