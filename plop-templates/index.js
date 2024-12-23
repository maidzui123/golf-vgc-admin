module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a reusable component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{camelCase name}}/{{pascalCase name}}Table.js",
        templateFile: "component/Component.js.hbs",
      },
      {
        type: "add",
        path: "../src/components/drawer/{{pascalCase name}}Drawer.js",
        templateFile: "component/ComponentDrawer.js.hbs",
      },
      {
        type: "modify",
        path: "../src/components/table/ShowHideButton.js",
        pattern: "/** TODO: SHOWHIDEBUTTON IMPORT */",
        templateFile: "component/table/showhidebuttonimport.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../src/components/table/ShowHideButton.js",
        pattern: "/** TODO: SHOWHIDEBUTTON*/",
        templateFile: "component/table/showhidebutton.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../src/components/modal/MainModal.js",
        pattern: "/** TODO: MAINMODAL IMPORT */",
        templateFile: "component/modal/mainmodalimport.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../src/components/modal/MainModal.js",
        pattern: "/** TODO: MAINMODAL */",
        templateFile: "component/modal/mainmodal.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../src/components/modal/DeleteModal.js",
        pattern: "/** TODO: DELETEMODAL IMPORT */",    
        templateFile: "component/modal/deletemodalimport.js.hbs",
        abortOnFail: true,
        },
      {
        type: "modify",
        path: "../src/components/modal/DeleteModal.js",
        pattern: "/** TODO: DELETEMODAL */",
        templateFile: "component/modal/deletemodal.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: "../src/components/form/Select{{pascalCase name}}.js",
        templateFile: "component/Form.js.hbs",
      },
      {
        type: "add",
        path: "../src/pages/{{pascalCase name}}.js",
        templateFile: "page/Page.js.hbs",
      },
      {
        type: "add",
        path: "../src/services/{{pascalCase name}}Services.js",
        templateFile: "service/Service.js.hbs",
      },
      {
        type: "add",
        path: "../src/hooks/use{{pascalCase name}}Submit.js",
        templateFile: "hook/hook.js.hbs",
      },
      {
        type: "add",
        path: "../src/hooks/use{{pascalCase name}}Filter.js",
        templateFile: "hook/Filterhook.js.hbs",
      },
      {
        type: "add",
        path: "../../server/controller/{{camelCase name}}Controller.js",
        templateFile: "server/controller/controller.js.hbs",
      },
      {
        type: "add",
        path: "../../server/controller/{{camelCase name}}AdminController.js",
        templateFile: "server/controller/controllerAdmin.js.hbs",
      },
      {
        type: "add",
        path: "../../server/models/{{pascalCase name}}Schema.js",
        templateFile: "server/model/model.js.hbs",
      },
      {
        type: "add",
        path: "../../server/routes/{{camelCase name}}Routes.js",
        templateFile: "server/route/route.js.hbs",
      },
      {
        type: "add",
        path: "../../server/routes/{{camelCase name}}AdminRoutes.js",
        templateFile: "server/route/routeAdmin.js.hbs",
      },
      {
        type: "modify",
        path: "../src/routes/index.js",
        pattern: "/** TODO: CLIENT ROUTE IMPORT */",
        templateFile: "./routes/indexImport.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../src/routes/index.js",
        pattern: "/** TODO: CLIENT ROUTE */",
        templateFile: "./routes/index.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../src/routes/sidebar.js",
        pattern: "/** TODO: SIDEBAR */",
        templateFile: "./routes/sidebar.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../../server/api/index.js",
        pattern: "/** TODO: SERVER API IMPORT*/",
        templateFile: "./server/api/apiImport.js.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../../server/api/index.js",
        pattern: "/** TODO: SERVER API */",
        templateFile: "./server/api/index.js.hbs",
        abortOnFail: true,
      },

    ],
  });
};
