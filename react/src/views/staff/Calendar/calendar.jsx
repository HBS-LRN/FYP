import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
export default function Calendar() {
  useEffect(() => {
        const scriptPaths = ["../../../assets/libs/%40fullcalendar/core/main.min.js",
        "../../../assets/libs/%40fullcalendar/bootstrap/main.min.js",
        "../../../assets/libs/%40fullcalendar/daygrid/main.min.js",
        "../../../assets/libs/%40fullcalendar/timegrid/main.min.js",
        "../../../assets/libs/%40fullcalendar/interaction/main.min.js",
        "../../../assets/libs/moment/min/moment.min.js",
        "../../../assets/libs/jquery-ui-dist/jquery-ui.min.js",
        "../../../assets/libs/jquery/jquery.min.js",
        "../../../assets/libs/bootstrap/js/bootstrap.bundle.min.js",
        "../../../assets/libs/metismenu/metisMenu.min.js",
        "../../../assets/libs/simplebar/simplebar.min.js",
        "../../../assets/libs/node-waves/waves.min.js",
        "../../../assets/js/pages/calendar.init.js",
        "../../../assets/js/app.js"]
        
        const loadScripts = (paths) => {
            paths.forEach((path) => {
              const script = document.createElement("script");
              script.src = path;
              document.body.appendChild(script);
            });
          };
          loadScripts(scriptPaths);
          return () => {
            // Remove the scripts on component unmount
            scriptPaths.forEach((path) => {
              const script = document.querySelector(`script[src="${path}"]`);
              if (script) {
                document.body.removeChild(script);
              }
            });
          };
  
  });

  return (
    <div>
        <Helmet>
            <link rel="stylesheet" href="../../../assets/libs/%40fullcalendar/core/main.min.css" />
            <link rel="stylesheet" href="../../../assets/libs/%40fullcalendar/daygrid/main.min.css" />
            <link rel="stylesheet" href="../../../assets/libs/%40fullcalendar/bootstrap/main.min.css" />
            <link rel="stylesheet" href="../../../assets/libs/%40fullcalendar/timegrid/main.min.css" />

            <link rel="stylesheet" href="../../../assets/css/bootstrap.min.css" />
            <link rel="stylesheet" href="../../../assets/css/icons.min.css" />
            <link rel="stylesheet" href="../../../assets/css/app.min.css" />
        
        
        </Helmet>
         <div class="main-content">

<div class="page-content">
    <div class="container-fluid">

        {/* start page title */}
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Calendar</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Nazox</a></li>
                            <li class="breadcrumb-item active">Calendar</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        {/* end page title */}
        
        <div class="row mb-4">
            <div class="col-xl-3">
                <div class="card h-100">
                    <div class="card-body">
                        <button type="button" class="btn font-16 btn-primary waves-effect waves-light w-100"
                            id="btn-new-event" data-bs-toggle="modal" data-bs-target="#event-modal">
                            Create New Event
                        </button>

                        <div id="external-events">
                            <br/>
                            <p class="text-muted">Drag and drop your event or click in the calendar</p>
                            <div class="external-event fc-event bg-success" data-class="bg-success">
                                <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>New Event
                                Planning
                            </div>
                            <div class="external-event fc-event bg-info" data-class="bg-info">
                                <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>Meeting
                            </div>
                            <div class="external-event fc-event bg-warning" data-class="bg-warning">
                                <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>Generating
                                Reports
                            </div>
                            <div class="external-event fc-event bg-danger" data-class="bg-danger">
                                <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>Create
                                New theme
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> {/* end col*/}
            <div class="col-xl-9">
                <div class="card mb-0">
                    <div class="card-body">
                        <div id="calendar"></div>
                    </div>
                </div>
            </div> {/* end col */}
        </div> {/* end row*/}
        <div style={{clear: 'both'}}></div>

        {/* Add New Event MODAL */}
        <div class="modal fade" id="event-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header py-3 px-4">
                        <h5 class="modal-title" id="modal-title">Event</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body p-4">
                        <form class="needs-validation" name="event-form" id="form-event" novalidate>
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label class="form-label">Event Name</label>
                                        <input class="form-control" placeholder="Insert Event Name" type="text"
                                            name="title" id="event-title" required value=""/>
                                        <div class="invalid-feedback">Please provide a valid event name
                                        </div>
                                    </div>
                                </div> {/* end col*/}
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label class="form-label">Category</label>
                                        <select class="form-select" name="category" id="event-category">
                                            <option  selected> --Select-- </option>
                                            <option value="bg-danger">Danger</option>
                                            <option value="bg-success">Success</option>
                                            <option value="bg-primary">Primary</option>
                                            <option value="bg-info">Info</option>
                                            <option value="bg-dark">Dark</option>
                                            <option value="bg-warning">Warning</option>
                                        </select>
                                        <div class="invalid-feedback">Please select a valid event
                                            category</div>
                                    </div>
                                </div> {/* end col*/}
                            </div> {/* end row*/}
                            <div class="row mt-2">
                                <div class="col-6">
                                    <button type="button" class="btn btn-danger"
                                        id="btn-delete-event">Delete</button>
                                </div> {/* end col*/}
                                <div class="col-6 text-end">
                                    <button type="button" class="btn btn-light me-1"
                                        data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success" id="btn-save-event">Save</button>
                                </div> {/* end col*/}
                            </div> {/* end row*/}
                        </form>
                    </div>
                </div>
                {/* end modal-content*/}
            </div>
            {/* end modal dialog*/}
        </div>
        {/* end modal*/}
        
    </div> {/* container-fluid */}
</div>
{/* End Page-content */}

<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <script>document.write(new Date().getFullYear())</script> © Nazox.
            </div>
            <div class="col-sm-6">
                <div class="text-sm-end d-none d-sm-block">
                    Crafted with <i class="mdi mdi-heart text-danger"></i> by <a href="https://1.envato.market/themesdesign" target="_blank">Themesdesign</a>
                </div>
            </div>
        </div>
    </div>
</footer>

</div>
{/* <div class="right-bar">
<div data-simplebar class="h-100">
<div class="rightbar-title d-flex align-items-center px-3 py-4">

    <h5 class="m-0 me-2">Settings</h5>

    <a href="javascript:void(0);" class="right-bar-toggle ms-auto">
        <i class="mdi mdi-close noti-icon"></i>
    </a>
</div>


<hr class="mt-0" />
<h6 class="text-center mb-0">Choose Layouts</h6>

<div class="p-4">
    <div class="mb-2">
        <img src="assets/images/layouts/layout-1.jpg" class="img-fluid img-thumbnail" alt="layout-1"/>
    </div>

    <div class="form-check form-switch mb-3">
        <input class="form-check-input theme-choice" type="checkbox" id="light-mode-switch" checked/>
        <label class="form-check-label" for="light-mode-switch">Light Mode</label>
    </div>

    <div class="mb-2">
        <img src="assets/images/layouts/layout-2.jpg" class="img-fluid img-thumbnail" alt="layout-2"/>
    </div>
    <div class="form-check form-switch mb-3">
        <input class="form-check-input theme-choice" type="checkbox" id="dark-mode-switch" data-bsStyle="assets/css/bootstrap-dark.min.css" data-appStyle="assets/css/app-dark.min.css"/>
        <label class="form-check-label" for="dark-mode-switch">Dark Mode</label>
    </div>

    <div class="mb-2">
        <img src="assets/images/layouts/layout-3.jpg" class="img-fluid img-thumbnail" alt="layout-3"/>
    </div>
    <div class="form-check form-switch mb-5">
        <input class="form-check-input theme-choice" type="checkbox" id="rtl-mode-switch" data-appStyle="assets/css/app-rtl.min.css"/>
        <label class="form-check-label" for="rtl-mode-switch">RTL Mode</label>
    </div>

</div>

</div> 
</div> */}
{/* <div class="rightbar-overlay"></div> */}

    </div>
 );
} 