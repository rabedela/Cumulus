({ // eslint-disable-line

    /******************************** Template Details Controller Functions *****************************/

    /* ***************************************************************
     * @Description. Constructs the Model Module, and the View Modules.
     *****************************************************************/
    init: function (component, event, helper) {
        //view mode is set with lightning app builder; determine if page is in edit or create mode by checking for recordId
        //todo: move this to proper place in the module
        if (component.get("v.mode") != 'view') {
            if (component.get("v.recordId") != 'null') {
                component.set("v.mode", "edit");
            } else {
                component.set("v.mode", "create");
            }
        }
        var bgeTemplateController = helper.BGETemplateController(component);

        var model = helper.TemplateDetailsModel();
        model.setBackendController(bgeTemplateController);
        component.set('v.model', model);

        var templateInfoView = helper.TemplateInfoView(component, model);
        component.set('v.templateInfo', templateInfoView);
        var templateMetadataView = helper.TemplateMetadataView(component, model);
        component.set('v.templateMetadata', templateMetadataView);
        var availableTemplateFieldsView = helper.AvailableTemplateFieldsView(component, model);
        component.set('v.availableTemplateFields', availableTemplateFieldsView);
        var activeTemplateFieldsView = helper.ActiveTemplateFieldsView(component, model);
        component.set('v.activeTemplateFields', activeTemplateFieldsView);

        model.init();
    },

    /* ***************************************************************
     * @Description. Cancels edit or creation of the template.
     *****************************************************************/
    cancel: function(component, event, helper) {

    },

    /* ***************************************************************
     * @Description. Saves the template information. 
     *****************************************************************/
    save: function(component, event, helper) {
        var templateInfoData = component.get("v.templateInfo");
        var model = component.get('v.model');
        model.getTemplateInfo().load(templateInfoData);
        model.save();
    },

    /******************************** Template Fields Controller Functions *****************************/

    /* ***************************************************************
     * @Description. Updates the selected available fields in the 
     * Template Fields Model.
     *****************************************************************/
    selectAvailableTemplateFields: function (component, event, helper) {
        var selectedFields = {};
        event.getParam('selectedRows').forEach(function(selectedRow) {
            selectedFields[selectedRow.id] = selectedRow;
        });
        var model = component.get('v.model');
        model.getTemplateFields().selectAvailables(selectedFields);
    },

    /* ***************************************************************
     * @Description. Updates the selected active fields in the 
     * Template Fields Model.
     *****************************************************************/
    selectActiveTemplateFields: function (component, event, helper) {
        var selectedFields = {};
        event.getParam('selectedRows').forEach(function(selectedRow) {
            selectedFields[selectedRow.id] = selectedRow;
        });
        var model = component.get('v.model');
        model.getTemplateFields().selectActives(selectedFields);
    },

    /* ***************************************************************
     * @Description. Updates the selected available fields in the 
     * Template Fields Model to active.
     *****************************************************************/
    updateToActive: function (component, event, helper) {
        var model = component.get('v.model');
        model.getTemplateFields().updateToActive();
    },

    /* ***************************************************************
     * @Description. Updates the selected active fields in the 
     * Template Fields Model to available.
     *****************************************************************/
    updateToAvailable: function (component, event, helper) {
        var model = component.get('v.model');
        model.getTemplateFields().updateToAvailable();
    }
}); // eslint-disable-line