
package forge;

import com.atlassian.bamboo.specs.api.BambooSpec;
import com.lmig.dna.specs.DnaCloudFoundryBlueGreenDeployment;
import com.lmig.dna.specs.build.DnaNodeAppBuild;
// import static com.lmig.forge.bamboo.specs.patterns.DeploymentAddOn.CONFIGURE_IDP;

import com.lmig.forge.bamboo.specs.components.tasks.forge.ManifestProcessorTask;
import com.lmig.forge.bamboo.specs.patterns.AddOns;

@BambooSpec
public class Pipeline {

    private static final AddOns ADD_ONS = new AddOns()
        .buildAddOns();
        // .deploymentAddOns(CONFIGURE_IDP);

    public static void main(String[] args) {
        // Build
        new DnaNodeAppBuild(PipelineParameters.PIPELINE_CONFIGURATION)
                .addOns(ADD_ONS)
                .outputDirectory("dist")
                .publish();

        // Deployment
        new DnaCloudFoundryBlueGreenDeployment(PipelineParameters.PIPELINE_CONFIGURATION)
                .disableAppDynamicsLicenseKeyCheck() // Not using appD
                .disableAddOns(DeploymentAddOn.APP_DYNAMICS)
                .deploymentTasks(
                        new ManifestProcessorTask()
                                .description("Kafka Deployment task")
                                .forgeFile("topic-management-${bamboo.forge.deployment.key}.yml")
                )
                .addOns(ADD_ONS)
                .autoDeployAfterSuccessfulBuild()
                .publish();
    }
}
